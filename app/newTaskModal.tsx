import { Link, router } from 'expo-router';
import { Text, View } from 'react-native';

export default function newTaskModal() {
  const isOpen = router.canGoBack();

  return (
    <View>
      <Text>Modal Screen</Text>
      {isOpen && <Link href="../">Close Modal</Link>}
    </View>
  )
}