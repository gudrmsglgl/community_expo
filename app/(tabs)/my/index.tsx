import AuthRoute from "@/components/AuthRoute";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  return (
    <SafeAreaView>
      <AuthRoute>
        <Text>My Screen</Text>
      </AuthRoute>
    </SafeAreaView>
  );
}
