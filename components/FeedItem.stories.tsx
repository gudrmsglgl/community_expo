import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { FeedItemView } from "./FeedItem";

const meta: Meta<typeof FeedItemView> = {
  title: "DesignSystem/FeedItemView",
  component: FeedItemView,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "white" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof FeedItemView> = {
  args: {
    post: {
      id: 1,
      userId: 1,
      title: "게시글 제목",
      description: "게시글 내용",
      createdAt: "2021-01-01",
      author: {
        id: 1,
        nickname: "작성자",
        imageUri: undefined,
      },
      imageUris: [],
      likes: [{ userId: 1 }],
      hasVote: false,
      voteCount: 0,
      commentCount: 10,
      viewCount: 100,
      votes: undefined,
      comments: undefined,
    },
    currentUserId: 1,
    onPressMore: () => {},
  },
};
