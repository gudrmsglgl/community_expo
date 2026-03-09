import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "DesignSystem/InputField",
  component: InputField,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "white" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const FilledWithLabel: Story = {
  args: {
    label: "소개",
    variant: "Filled",
  },
};

export const Filled: Story = {
  args: {
    variant: "Filled",
  },
};

export const FilledError: Story = {
  args: {
    variant: "Filled",
    isError: true,
    errorHint: "내용을 입력해주세요.",
  },
};

export const Outlined: Story = {
  args: {
    variant: "Outlined",
  },
};

export const Standard: Story = {
  args: {
    variant: "Standard",
  },
};
