import AsyncStorage from '@react-native-async-storage/async-storage';

export async function addTask(itemNumber: number, task: string, author: string, status: string = 'active') {
  let taskJSON = {
    authorName: author,
    taskDesc: task,
    status: status
  }

  if ( itemNumber === null || author === null) {
    console.log('ItenNumber:', itemNumber)
    console.log('author:', author)
    return;
  }

  try {
    console.log('Inside async set item...')
    await AsyncStorage.setItem('task-' + itemNumber, JSON.stringify(taskJSON))
  } catch (e) {
    console.log('Error adding task: ', e)
    return;
  }
    
}

export async function changeTaskStatus(taskKey: string, task: string, author: string, status: string) {
  let taskJSON = {
    authorName: author,
    taskDesc: task,
    status: status
  }

  try {
    console.log('Inside async markTaskAsComplete item...', taskJSON)
    await AsyncStorage.setItem(taskKey, JSON.stringify(taskJSON))
  } catch (e) {
    console.log('Error updating task: ', e)
    return;
  }
    
}

export async function removeTask(taskKey: string) {
  try {
    console.log('Inside async delete item...')
    await AsyncStorage.removeItem(taskKey)
  } catch (e) {
    console.log('Error removing task: ', e)
    return;
  }
    
}

export async function removeAllTasks() {
  try {
    console.log('Inside async delete all item...')
    await AsyncStorage.clear()
  } catch (e) {
    console.log('Error removing all tasks: ', e)
    return;
  }
    
}

export async function getTasks(filter = null) {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log('Inside GetAllKeys -- keys:', keys)
    const getTaskData = await AsyncStorage.multiGet(keys);
    console.log('Inside GetAllKeys -- getTaskData:', getTaskData)

    const mappedData = getTaskData.map(([key, jsonString]) => {
      const parsed = JSON.parse(jsonString);
      return { key, ...parsed}
    })

    console.log('Inside GetTasks -- after mapping: ', mappedData)

    return mappedData;
  }catch (e) {
    console.log("Get error: ", e)
  }
    
}

export async function getNextTaskIDNumber(): number {
  let allTasksKeys;

  try {
    const newAsyncPromise: Promise<string> = await AsyncStorage.getAllKeys()

    newAsyncPromise.then((taskArray) => {

    })

      let numberOfTasks: number = allTasksKeys.length;
    return numberOfTasks
  }catch(e) {
    console.log('Couldn`t get all keys:', e)
    return 0
  }

};