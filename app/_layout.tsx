import queryClient from "@/api/queryClient";
import { fonts } from "@/constants/fonts";
import useAuth from "@/hooks/queries/useAuth";
import useNotificationObserver from "@/hooks/useNotificationObserver";
import "@/i18n";
import { getSavedDeviceLanguage } from "@/utils/secureStore";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import i18n from "i18next";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { Toaster } from "sonner-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function useLoadLanguageEffect() {
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await getSavedDeviceLanguage();
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };

    loadLanguage();
  }, []);
}

function useLoadFonts() {
  useFonts({
    [fonts.casquareCode1080
      .regular]: require("@/assets/font/CasquareCode1080-Regular.ttf"),
    [fonts.casquareCode1080
      .semiBold]: require("@/assets/font/CasquareCode1080-SemiBold.ttf"),
    [fonts.casquareCode1080
      .bold]: require("@/assets/font/CasquareCode1080-Bold.ttf"),
  });
}

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  useNotificationObserver();
  useLoadLanguageEffect();
  useLoadFonts();

  return (
    <GestureHandlerRootView>
      <ActionSheetProvider>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <StatusBar style="dark" />
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
