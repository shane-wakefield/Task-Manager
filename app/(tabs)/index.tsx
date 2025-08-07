import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Task Manager</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 100,
  },
  titleContainer: {
    justifyContent: 'center',
    width: '100%'
  },
  titleText: {
    textAlign: 'center',
    width: '100%'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
