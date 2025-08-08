import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import IndividualTask from "./IndividualTask";

export function TasksList() {

  return (
    <GestureHandlerRootView style={styles.taskPanel}>
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
        <IndividualTask />
        <IndividualTask />
      </ScrollView>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({


  taskPanel: {
    height: '100%',
    marginLeft: 15,
    marginRight: 15,
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 2,
  }
})