import { Stack } from "expo-router";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const isDevelopment = __DEV__ || process.env.NODE_ENV === "development";

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {isDevelopment && (
        <Stack.Screen name="storybook" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
