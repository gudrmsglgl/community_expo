import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
export default function EditPostScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Edit Post {id}</Text>
    </View>
  );
}
