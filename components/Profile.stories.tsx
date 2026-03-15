import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import Profile from "./Profile";

const meta: Meta<typeof Profile> = {
  title: "DesignSystem/Profile",
  component: Profile,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "white" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    nickname: "John Doe",
    option: undefined,
    createdAt: "2021-01-01",
  },
};
