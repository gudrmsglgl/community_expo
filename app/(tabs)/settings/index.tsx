import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { logout } = useAuth();
  const [shouldGoLogin, setShouldGoLogin] = useState(false);

  useEffect(() => {
    if (shouldGoLogin) {
      router.replace("/auth");
    }

    return () => {
      setShouldGoLogin(false);
    };
  }, [shouldGoLogin]);

  return (
    <SafeAreaView>
      <Text
        onPress={() => {
          logout();
          setShouldGoLogin(true);
        }}
      >
        로그아웃
      </Text>
    </SafeAreaView>
  );
}
