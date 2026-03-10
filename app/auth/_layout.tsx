import { colors } from "@/components";
import Foundation from "@expo/vector-icons/Foundation";
import { Link, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
        headerTintColor: colors.BLACK,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "로그인",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Link href={"/"} dismissTo>
              <Foundation name="home" size={24} color="black" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          title: "회원가입",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: "이메일 로그인",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
