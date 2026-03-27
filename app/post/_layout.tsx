import { colors } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.WHITE },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          headerShown: true,
          title: "글쓰기",
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Link href={"/"} dismissTo>
              <Ionicons name="chevron-back" size={24} color="black" />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
