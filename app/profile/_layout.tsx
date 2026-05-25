import { colors } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "Profile",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          headerShown: true,
          title: "프로필 변경",
          contentStyle: {
            backgroundColor: colors.WHITE,
          },
          headerShadowVisible: true,
        }}
      />
    </Stack>
  );
}
