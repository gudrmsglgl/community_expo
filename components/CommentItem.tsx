import { Comment } from "@/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StyleSheet, View } from "react-native";
import CTAButton from "./CTAButton";
import InputField from "./InputField";
import Profile from "./Profile";
dayjs.extend(relativeTime);

interface CommentProps {
  comment: Comment;
  isReply?: boolean;
  currentUserId: number;
}

export default function CommentItem({
  comment,
  isReply = false,
  currentUserId,
}: CommentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color="black"
          />
        )}
        <Profile
          nickname={comment.user.nickname}
          createdAt={dayjs(comment.createdAt).fromNow()}
          onPress={() => {}}
          imageUri={comment.user.imageUri}
          option={
            comment.user.id === currentUserId &&
            !comment.isDeleted && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color="black"
                style={{ paddingRight: 32 }}
                onPress={() => {}}
              />
            )
          }
        />
      </View>

      <InputField
        variant="Filled"
        value={comment.isDeleted ? "삭제된 댓글입니다." : comment.content}
        editable={false}
      />
      <CTAButton
        variant="Standard"
        title="답글 남기기"
        size="Small"
        style={styles.replyButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileContainer: {
    flexDirection: "row",
    gap: 9,
    alignItems: "center",
  },
  replyButton: {
    paddingTop: 8,
    paddingLeft: 8,
  },
});
