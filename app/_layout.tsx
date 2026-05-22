import queryClient from "@/api/queryClient";
import useAuth from "@/hooks/queries/useAuth";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { Toaster } from "sonner-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  return (
    <GestureHandlerRootView>
      <ActionSheetProvider>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <RootNavigator />
          </KeyboardProvider>
        </QueryClientProvider>
      </ActionSheetProvider>
      <Toaster />
    </GestureHandlerRootView>
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
      <Stack.Screen name="image" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}
