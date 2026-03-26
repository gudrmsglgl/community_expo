import AuthRoute from "@/components/AuthRoute";
import useAuth from "@/hooks/queries/useAuth";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { logout } = useAuth();
  return (
    <SafeAreaView>
      <AuthRoute>
        <Text onPress={logout}>로그아웃</Text>
      </AuthRoute>
    </SafeAreaView>
  );
}
