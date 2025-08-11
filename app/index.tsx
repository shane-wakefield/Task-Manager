import { TasksList } from '@/components/TasksList';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Dimensions, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Helpers
import { getTasks, removeAllTasks } from '@/helpers/AsyncCRUD';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default async function HomeScreen() {
  const [tasks, setTasks] = useState([])
  const [taskFilter, changeFilter] = useState('all')

  const { height, width } = useWindowDimensions();
  const router = useRouter();

  let incomingTaskData: any[] = [];

  useEffect(() => {
    getTasks().then(tasks => {
      setTasks(tasks)
    })
  }, [] );

  useFocusEffect(
    useCallback(() => {
      getTasks().then(tasks => {
      setTasks(tasks)
    })
    }, [])
  );

  const deleteAllTasks = () => {
      Alert.alert('Confirm Delete', 'Are you sure you want to remove all tasks?', [
        {
          text: 'OK',
          onPress: () => {
            removeAllTasks()
            setTasks([])
          }
        },
        {
          text: 'Cancel',
          onPress: () => { return }
        },
      ]);
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Task Manager</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable 
              style={taskFilter == 'all' ? styles.buttonBoxActive : styles.buttonBox}
              onPress={() => changeFilter('all')}
            >
              <Text>All</Text>
            </Pressable>
            <Pressable
              style={taskFilter == 'active' ? styles.buttonBoxActive : styles.buttonBox}
              onPress={() => changeFilter('active')}
            >
              <Text>Active</Text>
            </Pressable>
            <Pressable
              style={taskFilter == 'complete' ? styles.buttonBoxActive : styles.buttonBox}
              onPress={() => changeFilter('complete')}
            >
              <Text>Complete</Text>
            </Pressable>
            <View style={styles.deleteAllContainer}>
              <Pressable
                onPress={() => deleteAllTasks()}
              >
                <Ionicons name="trash-bin" size={35} color="red" />
              </Pressable>
            </View>
          </View>
          <TasksList taskData={tasks} setFilter={taskFilter} />
          <View style={styles.newTaskButton}>
            <Button title="Add New Task" color={'##005C75'} onPress={() => router.navigate('/newTaskModal')} accessibilityLabel='Button to open a screen to add a new task'/>
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: windowWidth,
    height: windowHeight,
    marginTop: 20,
    paddingBottom: 200
  },
  titleContainer: {
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  titleText: {
    textAlign: 'center',
    color: '#0080A3', 
    fontSize: 30,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: windowWidth
  },
  deleteAllContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '40%'
  },
  buttonBox: {
    borderColor: '#BFBFBF',
    borderRadius: 20,
    margin: 5,
    padding: 10,
    borderWidth: 1
  },
  buttonBoxActive: {
    borderColor: '#696969',
    borderWidth: 2,
    borderRadius: 20,
    margin: 5,
    padding: 10,
  },
  newTaskButton: {
    width: '95%',
    textDecorationColor: 'black',
    backgroundColor: '#61DCFF',
    margin: 10,
    borderRadius: 20
  }
});
