import useAppToast from "@/hooks/useAppToast";
import useDeleteComment from "@/hooks/useDeleteComment";
import { PostComment } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from ".";
import { DefaultDeletedAvatar, DefaultRandomAvatar } from "./Avatar";
import CTAButton from "./CTAButton";
import InputField from "./InputField";
import Profile from "./Profile";
dayjs.extend(relativeTime);

interface CommentProps {
  comment: PostComment;
  isReplyCommentComponent?: boolean;
  currentUserId: number;
  shouldShowReplyTargetComment?: boolean;
  onMoreChildrenComments?: () => void;
  onReply?: () => void;
}

export default function CommentItem({
  comment,
  isReplyCommentComponent = false,
  currentUserId,
  shouldShowReplyTargetComment = false,
  onMoreChildrenComments,
  onReply,
}: CommentProps) {
  const { mutate: deleteCommmentMutation } = useDeleteComment();
  const { successToast } = useAppToast();
  const { t: translation } = useTranslation();

  return (
    <CommentItemView
      comment={comment}
      isReplyCommentComponent={isReplyCommentComponent}
      currentUserId={currentUserId}
      shouldShowReplyTargetComment={shouldShowReplyTargetComment}
      onDelete={() => {
        deleteCommmentMutation(comment.id, {
          onSuccess: () => {
            successToast(translation("toast.comment.delete"));
          },
        });
      }}
      onReply={onReply}
      onMoreChildrenComments={onMoreChildrenComments}
    />
  );
}

export function CommentItemView({
  comment,
  isReplyCommentComponent = false,
  shouldShowReplyTargetComment = false,
  currentUserId,
  onDelete,
  onReply,
  onMoreChildrenComments,
}: CommentProps & {
  onDelete: () => void;
  onReply?: () => void;
}) {
  return (
    <View
      style={[
        styles.container,
        shouldShowReplyTargetComment && { backgroundColor: colors.ORANGE_100 },
      ]}
    >
      <View
        style={
          isReplyCommentComponent
            ? styles.profileReplyContainer
            : styles.profileContainer
        }
      >
        {isReplyCommentComponent && (
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
          onPressThumbnail={() => {}}
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

      {!isReplyCommentComponent && !comment.isDeleted && (
        <View style={styles.bottomContainer}>
          <CTAButton
            variant="Standard"
            title="답글 남기기"
            size="Small"
            onPress={onReply}
          />
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={onMoreChildrenComments}
          >
            <View>
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={15}
                color="black"
              />
            </View>

            <Text>{comment.replies.length}</Text>
          </Pressable>
        </View>
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
    paddingBottom: 9,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileReplyContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 8,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 8,
  },
});
