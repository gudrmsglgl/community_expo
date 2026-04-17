import useAppToast from "@/hooks/useAppToast";
import useDeleteComment from "@/hooks/useDeleteComment";
import { Comment } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StyleSheet, View } from "react-native";
import { DefaultDeletedAvatar, DefaultRandomAvatar } from "./Avatar";
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
  const { mutate: deleteCommmentMutation } = useDeleteComment();
  const showToast = useAppToast();

  return (
    <CommentItemView
      comment={comment}
      isReply={isReply}
      currentUserId={currentUserId}
      onDelete={() => {
        deleteCommmentMutation(comment.id, {
          onSuccess: () => {
            showToast("댓글이 삭제되었습니다.");
          },
        });
      }}
    />
  );
}

export function CommentItemView({
  comment,
  isReply = false,
  currentUserId,
  onDelete,
}: CommentProps & {
  onDelete: () => void;
}) {
  return (
    <View style={styles.container}>
      <View
        style={isReply ? styles.profileReplyContainer : styles.profileContainer}
      >
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color="black"
            style={{ marginRight: 8 }}
          />
        )}
        <Profile
          nickname={comment.isDeleted ? "(삭제된 댓글)" : comment.user.nickname}
          createdAt={dayjs(comment.createdAt).fromNow()}
          onPress={() => {}}
          imageUri={comment.user.imageUri}
          option={
            comment.user.id === currentUserId &&
            !comment.isDeleted && <MoreButton onDelete={onDelete} />
          }
          defaultUserAvatar={
            comment.isDeleted
              ? DefaultDeletedAvatar
              : currentUserId === comment.user.id && DefaultRandomAvatar
          }
        />
      </View>

      <InputField
        variant="Filled"
        value={comment.isDeleted ? "삭제된 댓글입니다." : comment.content}
        editable={false}
      />
      {!isReply && !comment.isDeleted && (
        <CTAButton
          variant="Standard"
          title="답글 남기기"
          size="Small"
          style={styles.replyButton}
        />
      )}
    </View>
  );
}

function MoreButton({ onDelete }: { onDelete: () => void }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const deleteButtonIndex = 0;
  const cancelButtonIndex = 1;

  return (
    <Ionicons
      name="ellipsis-vertical"
      size={24}
      color="black"
      onPress={() => {
        showActionSheetWithOptions(
          {
            options: ["삭제", "취소"],
            cancelButtonIndex,
            destructiveButtonIndex: deleteButtonIndex,
            textStyle: {
              flex: 1,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            },
            showSeparators: true,
          },
          (index) => {
            switch (index) {
              case deleteButtonIndex:
                onDelete();
                break;
              case cancelButtonIndex:
                break;
              default:
                break;
            }
          },
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileReplyContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  replyButton: {
    paddingTop: 8,
    paddingLeft: 8,
  },
});
