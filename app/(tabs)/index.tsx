import CTAButton from "@/components/CTAButton";
import { router } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <CTAButton title="go login" onPress={() => router.push("/auth")} />
    </SafeAreaView>
  );
}
