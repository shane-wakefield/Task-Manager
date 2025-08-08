import { StyleSheet, View } from "react-native";

// import DeviceInfo from "react-native-device-info";
import * as Device from 'expo-device';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import IndividualTask from "./IndividualTask";

export function TasksList() {

  var platform = Device.manufacturer;

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
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          {/* <Text>Thats what we like to see! An empty tasks list... 😌</Text> */}
          </ScrollView>
        </View>

        :
        
        <ScrollView>
          <>
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          <IndividualTask />
          {/* <Text>Thats what we like to see! An empty tasks list... 😌</Text> */}
          </>
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
  }
})