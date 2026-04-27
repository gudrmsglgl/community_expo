import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { VoteParticipationSummary } from "./Votes";

const meta: Meta<typeof VoteParticipationSummary> = {
  title: "DesignSystem/Vote/Participation Summary",
  component: VoteParticipationSummary,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "white" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    voteCount: 10,
  },
};
