import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  return (
    <SafeAreaView edges={["left", "right", "bottom"]}>
      <Text>Auth Screen</Text>
    </SafeAreaView>
  );
}
