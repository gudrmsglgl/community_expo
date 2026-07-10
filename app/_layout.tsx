import apolloClient from "@/api/apolloClient";
import queryClient from "@/api/queryClient";
import { fonts } from "@/constants/fonts";
import useAuth from "@/hooks/queries/useAuth";
import useNotificationObserver from "@/hooks/useNotificationObserver";
import "@/i18n";
import { getSavedDeviceLanguage } from "@/utils/secureStore";
import { ApolloProvider } from "@apollo/client/react";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { changeLanguage } from "i18next";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { Toaster } from "sonner-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

void SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function useLoadLanguageEffect() {
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await getSavedDeviceLanguage();
        if (savedLanguage) {
          await changeLanguage(savedLanguage);
        }
      } finally {
        setIsLanguageLoaded(true);
      }
    };

    loadLanguage();
  }, []);

  return isLanguageLoaded;
}

function useLoadFonts() {
  const [isFontLoaded, fontError] = useFonts({
    [fonts.casquareCode1080
      .regular]: require("@/assets/font/CasquareCode1080-Regular.ttf"),
    [fonts.casquareCode1080
      .semiBold]: require("@/assets/font/CasquareCode1080-SemiBold.ttf"),
    [fonts.casquareCode1080
      .bold]: require("@/assets/font/CasquareCode1080-Bold.ttf"),
  });

  return isFontLoaded || Boolean(fontError);
}

function useHideSplashScreenEffect(isAppReady: boolean) {
  useEffect(() => {
    if (isAppReady) {
      void SplashScreen.hideAsync();
    }
  }, [isAppReady]);
}

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  useNotificationObserver();
  const isLanguageLoaded = useLoadLanguageEffect();
  const isFontLoaded = useLoadFonts();
  const isAppReady = isLanguageLoaded && isFontLoaded;

  useHideSplashScreenEffect(isAppReady);

  if (!isAppReady) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ActionSheetProvider>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            <KeyboardProvider>
              <StatusBar style="dark" />
              <RootNavigator />
            </KeyboardProvider>
          </ApolloProvider>
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
