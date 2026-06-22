import { colors } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.WHITE },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: null,
          headerLeft: () => (
            <Pressable
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/")
              }
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
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
      <Stack.Screen
        name="edit/[id]"
        options={{
          headerShown: true,
          title: "수정",
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Link href={"/"} dismissTo>
              <Ionicons name="chevron-back" size={24} color="black" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="search/index"
        options={{
          headerShown: false,
          title: "",
        }}
      />
    </Stack>
  );
}
