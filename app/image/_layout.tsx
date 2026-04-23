import { colors } from "@/components";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { router, Stack } from "expo-router";
import { Pressable, View } from "react-native";

export default function ImageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.BLACK },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: null,
          headerBackground: () => (
            <View style={{ backgroundColor: colors.BLACK }} />
          ),
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
