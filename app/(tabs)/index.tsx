import { TasksList } from '@/components/TasksList';
import { Dimensions, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function HomeScreen() {

  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        {/* <View style={styles.mainContainer}> */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Task Manager</Text>
          </View>
          <TasksList />
        {/* </View> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: windowWidth,
    height: windowHeight,
    marginTop: 20,
    paddingBottom: 140
  },
  titleContainer: {
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    width: '100%'
  }
});
