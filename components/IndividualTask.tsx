import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, Pressable } from "react-native-gesture-handler";

import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

var borderColour = 'black'

export default function IndividualTask() {
  const [ complete, toggleComplete ] = useState(false)
  const [ deleteTask, setToDelete ] = useState(false)

  return (
    <GestureHandlerRootView style={styles.taskBox}>
      <Text style={styles.taskDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas, orci id tristique</Text>
      <Text style={styles.taskAuthor}>Shane</Text>
      <View style={styles.taskActions}>
        <Pressable
          onPress={() => toggleComplete(complete => !complete)}
          onPressOut={() => {
            console.log('OnPressOut initiated')
            deleteTask ? borderColour = 'red' : borderColour = 'red';
            console.log('Border colour:', borderColour)
          }}
          onLongPress={() => {
            console.log("Long press detected");
            setToDelete(true)
          }}
        >
          {complete ? <Ionicons name="checkmark-circle" size={30} color="green" /> : <Ionicons name="checkmark-circle-outline" size={30} color="grey" />}
        </Pressable>
      </View>
    </GestureHandlerRootView>
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
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskDescription: {
    // backgroundColor: 'blue',
    textAlign: 'left',
    textAlignVertical: 'center',
    width: '60%'
  },
  taskAuthor: {
    textAlign: 'center',
    // backgroundColor: 'yellow',
    width: '20%'
  },
  taskActions: {
    // backgroundColor: 'red',
    alignItems: 'center',
    width: '20%'
  }
})