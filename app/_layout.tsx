import queryClient from "@/api/queryClient";
import useAuth from "@/hooks/queries/useAuth";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import type { ComponentType } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

const isStorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

export default function RootLayout() {
  if (isStorybookEnabled) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const StorybookUIRoot = require("../.rnstorybook").default as ComponentType;
    return <StorybookUIRoot />;
  }

  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <RootNavigator />
        </KeyboardProvider>
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}

function RootNavigator() {
  const { auth } = useAuth();
  console.log("auth", auth);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
    </Stack>
  );
}
