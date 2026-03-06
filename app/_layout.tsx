import { Stack } from "expo-router";
import type { ComponentType } from "react";
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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
