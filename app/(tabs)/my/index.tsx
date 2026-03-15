import { router, useFocusEffect } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  useFocusEffect(() => {
    router.push("/auth");
  });

  return (
    <SafeAreaView>
      <Text>My Screen</Text>
    </SafeAreaView>
  );
}
