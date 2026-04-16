import { type Meta, type StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import CommentItem from "./CommentItem";

const meta: Meta<typeof CommentItem> = {
  title: "DesignSystem/CommentItem",
  component: CommentItem,
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
    comment: {
      id: 1,
      content: "댓글 기본 내용",
      createdAt: "2026-04-16",
      user: {
        id: 1,
        nickname: "작성자",
        imageUri: undefined,
      },
      isDeleted: false,
    },
    currentUserId: 1,
  },
};

export const ReplyComment: Story = {
  args: {
    comment: {
      id: 1,
      content: "댓글 기본 내용",
      createdAt: "2026-04-16",
      user: {
        id: 1,
        nickname: "작성자",
        imageUri: undefined,
      },
      isDeleted: false,
    },
    isReply: true,
    currentUserId: 1,
  },
};
