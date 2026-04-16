import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { ComponentType } from "react";

const isStorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

function App() {
  if (isStorybookEnabled) {
    const StorybookUIRoot = require("./.rnstorybook").default as ComponentType;
    return <StorybookUIRoot />;
  }

  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
