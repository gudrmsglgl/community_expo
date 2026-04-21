import { type Meta, type StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { CommentItemView } from "./CommentItem";

const meta: Meta<typeof CommentItemView> = {
  title: "DesignSystem/CommentItem",
  component: CommentItemView,
  decorators: [
    (Story) => (
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 16,
        }}
      >
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
    isReplyCommentComponent: true,
    currentUserId: 1,
  },
};

export const DeletedComment: Story = {
  args: {
    comment: {
      id: 1,
      content: "삭제된 댓글",
      createdAt: "2026-04-16",
      user: {
        id: 1,
        nickname: "작성자",
        imageUri: undefined,
      },
      isDeleted: true,
    },
    currentUserId: 1,
  },
};

export const ReplyTargetComment: Story = {
  args: {
    comment: {
      id: 1,
      content: "삭제된 댓글",
      createdAt: "2026-04-16",
      user: {
        id: 1,
        nickname: "작성자",
        imageUri: undefined,
      },
      isDeleted: false,
    },
    currentUserId: 1,
    shouldShowReplyTargetComment: true,
  },
};
