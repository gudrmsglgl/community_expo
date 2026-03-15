import type { Preview } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

const preview: Preview = {
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
