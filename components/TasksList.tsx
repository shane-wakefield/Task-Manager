import { StyleSheet, Text, View } from "react-native";

// import DeviceInfo from "react-native-device-info";
import * as Device from 'expo-device';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import IndividualTask from "./IndividualTask";

// Helpers

type TasksListProps = {
  taskData: object[];
  setFilter: string
}

export function TasksList({taskData = [], setFilter}: TasksListProps) {

  var platform = Device.manufacturer;

  console.log('tasklist filter readout: ', setFilter)

  // I would normally use Device Info from NPM, but due to having to use Expo, I had to change to 'expo-device'
  //
  // Device.manufacturer().then((manufacturer) => {
  //   platform = manufacturer;
  // })

  return (
    <GestureHandlerRootView style={styles.taskPanel}>
      { platform === 'Google' ?

        <View style={styles.taskPanel}>
          <ScrollView>
            {taskData.length === 0 && (
              <Text style={styles.noTaskText}>Thats what we like to see! An empty tasks list... 😌</Text>
            )}

            {taskData.length > 0 &&
              taskData.map(r => (<IndividualTask taskKey={r.key} author={r.authorName} taskDesc={r.taskDesc} status={r.status} filter={setFilter} />))
            }
          </ScrollView>
        </View>

        :
        
        <ScrollView>
          {taskData.length === 0 && (
            <Text style={styles.noTaskText}>Thats what we like to see! An empty tasks list... 😌</Text>
          )}

          {taskData.length > 0 &&
            taskData.map(r => (<IndividualTask taskKey={r.key} author={r.authorName} taskDesc={r.taskDesc} status={r.status} filter={setFilter} />))
          }
        </ScrollView>
      }
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({

  taskPanel: {
    height: '100%',
    overflow: 'hidden',
    marginLeft: 15,
    marginRight: 15,
    borderColor: '#858585',
    borderRadius: 20,
    borderWidth: 4,
  },
  noTaskText: {
    margin: 15,
    textAlign: 'center'
  }
})