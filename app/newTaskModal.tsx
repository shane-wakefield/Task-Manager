import * as Device from 'expo-device';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

// Helpers
import { addTask, getTasks } from '@/helpers/AsyncCRUD';

var platform = Device.manufacturer;

export default function newTaskModal() {
  const isOpen = router.canGoBack();
  const [errorText, setErrorText] = useState('')
  const [task, onTaskChange] = useState('')
  const [author, onAuthorChange] = useState('')


  const addNewTask = async () => {
    setErrorText('');

    if( task == '' && author == '') {
      setErrorText('Required task information missing');
      return;
    }

    var knownTasks= await getTasks();
    const numOfTasks = knownTasks.filter(item => item.key != '').length;

    try{
      addTask(numOfTasks + 1, task, author, 'complete');
      router.back()
    }catch(e) {
      setErrorText('Couldn`t Add Task:' + e)
    }
  }

  return (
    <GestureHandlerRootView style={styles.modalContainer}>
      <Text style={styles.titleText}>Add New Task</Text>
      <Text style={styles.labelText}>Task Description</Text>
      <TextInput
        style={styles.textField}
        onChangeText={taskText => onTaskChange(taskText)}
        maxLength={30}
        value={task}
      />
      <Text style={styles.labelText}>Author</Text>
      <TextInput
        style={styles.textField}
        onChangeText={authorText => onAuthorChange(authorText)}
        maxLength={30}
        value={author} 
      />
      <Text style={styles.errorText}>{errorText}</Text>
      <Button title="Add Task" color={'##005C75'} onPress={() => { addNewTask()}} accessibilityLabel='Button to open a screen to add a new task'/>
      {isOpen && <Link href="../">Close Modal</Link>}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({

  modalContainer: {
    width: '90%',
    height: '90%',
    margin: 20,
    alignItems: 'center'
  },
  titleText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#0080A3', 
    fontSize: 30,
    width: '100%'
  },
  labelText: {
    marginTop: 5,
    width: '70%',
    paddingLeft: 10,
    color: '#696969'
  },
  textField: {
    height: platform === 'Google' ? 40 : 30,
    width: '70%',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 20,
  },
  errorText: {
    color: '#FF2E2E',
    marginTop: 20,
    fontSize: 12,
  }
})