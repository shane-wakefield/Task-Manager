import { TasksList } from '@/components/TasksList';
import { useRouter } from 'expo-router';
import { Button, Dimensions, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function HomeScreen() {

  const { height, width } = useWindowDimensions();
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Task Manager</Text>
          </View>
          <TasksList />
          <View style={styles.newTaskButton}>
            <Button title="Open Modal" color={'##005C75'} onPress={() => router.navigate('/newTaskModal')} accessibilityLabel='Button to open a screen to add a new task'/>
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
    paddingBottom: 130
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
  newTaskButton: {
    width: '95%',
    textDecorationColor: 'black',
    backgroundColor: '#61DCFF',
    margin: 10,
    borderRadius: 20
  }
});
