import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import CTAButton from "./CTAButton";

const meta: Meta<typeof CTAButton> = {
  title: "DesignSystem/CTAButton",
  component: CTAButton,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "white" }}>
        <Story />
      </View>
    ),
  ],
  args: {
    title: "저장",
  },
};

export default meta;

type Story = StoryObj<typeof CTAButton>;

export const FilledLarge: Story = {
  args: {
    title: "투표하기",
    variant: "Filled",
    size: "Large",
  },
};

export const FilledLargeFullText: Story = {
  args: {
    title:
      "이력서를 매우 자세하게 상세히 열심히 최대한 길게 경력을 바탕으로 제출해야 합니다. ",
    variant: "Filled",
    size: "Large",
  },
};

export const FilledLargeDisabled: Story = {
  args: {
    title: "투표하기",
    variant: "Filled",
    size: "Large",
    disabled: true,
  },
};

export const FilledMedium: Story = {
  args: {
    title: "투표하기",
    variant: "Filled",
    size: "Medium",
  },
};

export const FilledSmall: Story = {
  args: {
    title: "저장",
    variant: "Filled",
    size: "Small",
  },
};

export const OutlinedSmall: Story = {
  args: {
    variant: "Outlined",
    size: "Small",
  },
};

export const OutlinedSmallDisabled: Story = {
  args: {
    variant: "Outlined",
    size: "Small",
    disabled: true,
  },
};
