import { Alert, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, Pressable } from "react-native-gesture-handler";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

// Helpers
import { changeTaskStatus, removeTask } from "@/helpers/AsyncCRUD";

var borderColour = 'black'

type IndividualTaskProps = {
  taskKey: string;
  taskDesc: string;
  author: string;
  status: "active" | "complete";
  filter: string
}

export default function IndividualTask({taskKey, taskDesc, author, status, filter}: IndividualTaskProps) {
  const [ isComplete, toggleComplete ] = useState(status == 'active' ? true : false)

  console.log(taskKey + " " + status)

  const updateTaskStatus = () => {
    if ( !isComplete ) {
      changeTaskStatus(taskKey, taskDesc, author, 'complete')
    } else {
      changeTaskStatus(taskKey, taskDesc, author, 'active')
    }
  }

  const deleteTaskFromStorage = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to remove `' + taskDesc + '`?', [
      {
        text: 'OK',
        onPress: () => removeTask(taskKey)
      },
      {
        text: 'Cancel',
        onPress: () => { return }
      },
    ]);
  }

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {

      return {
        transform: [{ translateX: drag.value + 50 }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <View style={styles.rightAction}>
          <Pressable
            onPress={() => {
              deleteTaskFromStorage()
            }}
          >
            <Ionicons name="trash-sharp" size={35} color="red" />
          </Pressable>
        </View>
      </Reanimated.View>
    )
  }

  // let filter = 'active'

  return (
    <>
      {
        filter === status || 'all' && (
          <GestureHandlerRootView style={styles.taskBox}>
            <ReanimatedSwipeable
              childrenContainerStyle={styles.swipeable}
              friction={2}
              rightThreshold={70}
              renderRightActions={RightAction}
            >
              <Text style={styles.taskDescription}>{taskDesc}</Text>
              <Text style={styles.taskAuthor}>{author}</Text>
              <View style={styles.taskActions}>
                <Pressable
                  onPress={() => {
                    toggleComplete(isComplete => !isComplete);
                    updateTaskStatus();
                  }}
                >
                  {isComplete ? <Ionicons name="checkmark-circle" size={30} color="green" /> : <Ionicons name="checkmark-circle-outline" size={30} color="grey" />}
                </Pressable>
              </View>
            </ReanimatedSwipeable>
          </GestureHandlerRootView>
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  taskBox: {
    flexDirection: 'row',
    height: 70,
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: borderColour,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskDescription: {
    width: '60%',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  taskAuthor: {
    textAlign: 'center',
    width: '20%'
  },
  taskActions: {
    alignItems: 'center',
    width: '20%'
  },
  rightAction: { 
    width: 50, 
    height: 70,
    justifyContent: 'center',
    alignContent: 'center'
  },
  swipeable: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})