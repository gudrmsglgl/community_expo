import type { ComponentType } from "react";
import { StyleSheet, Text, View } from "react-native";

const isStorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

let StorybookUIRoot: ComponentType | null = null;

if (isStorybookEnabled) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  StorybookUIRoot = require("../.rnstorybook").default as ComponentType;
}

export default function StorybookScreen() {
  if (!isStorybookEnabled || !StorybookUIRoot) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Storybook is disabled</Text>
        <Text style={styles.body}>Run `npm run android:storybook` and reload the app.</Text>
      </View>
    );
  }

  return <StorybookUIRoot />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  body: {
    fontSize: 14,
  },
});
