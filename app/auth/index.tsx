import Logo from "@/assets/images/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  return (
    <SafeAreaView edges={["left", "right", "bottom"]}>
      <Logo />
    </SafeAreaView>
  );
}
