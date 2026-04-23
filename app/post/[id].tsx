import { colors } from "@/components";
import VerticalSlideAnimated from "@/components/animated/VerticalSlideAnimated";
import CommentItem from "@/components/CommentItem";
import CTAButton from "@/components/CTAButton";
import { FeedItemView } from "@/components/FeedItem";
import InputField from "@/components/InputField";
import useAuth from "@/hooks/queries/useAuth";
import useCreateComment from "@/hooks/useCreateComment";
import useGetPost from "@/hooks/useGetPost";
import useKeyboardVisible from "@/hooks/useKeyboardVisible";
import { Comment, PostComment } from "@/types";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { ForwardedRef, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostScreen() {
  const {
    auth: { id: userId },
  } = useAuth();

  const scrollViewRef = useRef<ScrollView | null>(null);
  const commentLayoutsRef = useRef<
    Record<number, { y: number; height: number }>
  >({});
  const inputCommentRef = useRef<TextInput | null>(null);
  const isKeyboardVisible = useKeyboardVisible();

  const { id } = useLocalSearchParams();
  const { data: post, isLoading } = useGetPost(Number(id));
  const { mutate: createCommentMutation } = useCreateComment();

  const [replyTargetComment, setReplyTargetComment] = useState<Comment | null>(
    null,
  );

  useEffect(() => {
    if (replyTargetComment) {
      inputCommentRef.current?.focus();
      return;
    }

    inputCommentRef.current?.blur();
  }, [replyTargetComment]);

  useScrollToReplyTargetCommentEffect(
    isKeyboardVisible,
    replyTargetComment,
    commentLayoutsRef.current[replyTargetComment?.id],
    scrollViewRef,
  );

  if (isLoading) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 50 }}
          keyboardDismissMode="interactive"
        >
          <FeedItemView post={post} currentUserId={Number(userId)} />
          <Divider height="big" />
          <View style={styles.commentCountContainer}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {post.commentCount}개의 댓글
            </Text>
          </View>
          <CommentList
            comments={post.comments || []}
            currentUserId={Number(userId)}
            replyTargetComment={replyTargetComment}
            onCommentLayout={(commentId, layout) => {
              commentLayoutsRef.current[commentId] = layout;
            }}
            onReply={(comment) => {
              setReplyTargetComment(comment);
            }}
          />
        </KeyboardAwareScrollView>

        <KeyboardStickyView>
          <BottomInputComment
            inputRef={inputCommentRef}
            isKeyboardVisible={isKeyboardVisible}
            replyTargetComment={replyTargetComment}
            onCancelReply={() => {
              setReplyTargetComment(null);
            }}
            onSubmit={(text) => {
              createCommentMutation(
                {
                  parentCommentId: replyTargetComment?.id,
                  content: text,
                  postId: post.id,
                },
                {
                  onSuccess: () => {
                    setReplyTargetComment(null);
                  },
                },
              );
            }}
          />
        </KeyboardStickyView>
      </View>
    </View>
  );
}

function CommentList({
  comments,
  currentUserId,
  replyTargetComment,
  onCommentLayout,
  onReply,
}: {
  comments: PostComment[];
  currentUserId: number;
  replyTargetComment?: Comment;
  onCommentLayout: (
    commentId: number,
    layout: { y: number; height: number },
  ) => void;
  onReply: (comment: Comment) => void;
}) {
  const [showChildrenComments, setShowChildrenComments] = useState(false);

  return comments.map((comment, index) => {
    const hasReplies = comment.replies?.length > 0;
    return (
      <View
        key={comment.id}
        onLayout={(e: LayoutChangeEvent) => {
          onCommentLayout(comment.id, {
            y: e.nativeEvent.layout.y,
            height: e.nativeEvent.layout.height,
          });
        }}
      >
        {index === 0 && <Divider height="hairline" />}
        <CommentItem
          key={comment.id}
          comment={comment}
          shouldShowReplyTargetComment={replyTargetComment === comment}
          currentUserId={currentUserId}
          onReply={() => {
            onReply(comment);
          }}
          onMoreChildrenComments={() => {
            setShowChildrenComments((prev) => !prev);
          }}
        />
        {index !== comments.length - 1 && <Divider height="hairline" />}
        {hasReplies && (
          <VerticalSlideAnimated visible={showChildrenComments}>
            {comment.replies.map((reply: PostComment) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                currentUserId={currentUserId}
                isReplyCommentComponent={true}
              />
            ))}
          </VerticalSlideAnimated>
        )}
      </View>
    );
  });
}

function BottomInputComment({
  replyTargetComment,
  onSubmit,
  onCancelReply,
  inputRef,
  isKeyboardVisible,
}: {
  replyTargetComment?: Comment;
  onSubmit: (text: string) => void;
  onCancelReply: () => void;
  inputRef: ForwardedRef<TextInput>;
  isKeyboardVisible: boolean;
}) {
  const [comment, setComment] = useState("");

  const onSubmitEditing = () => {
    onSubmit(comment);
    setComment("");
    Keyboard.dismiss();
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.inputCommentContainer,
        { paddingBottom: isKeyboardVisible ? 10 : insets.bottom },
      ]}
    >
      {replyTargetComment && (
        <Pressable
          style={styles.replyTargetCommentContainer}
          onPress={onCancelReply}
        >
          <Text
            style={styles.replyTargetUsername}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            @{replyTargetComment.user.nickname}
          </Text>
          <Text style={{ flex: 1, color: colors.Grey_700, fontSize: 13 }}>
            님에게 댓글 남기는 중
          </Text>
          <Ionicons
            name="close-circle-outline"
            size={20}
            color="black"
            style={{ marginEnd: 13 }}
          />
        </Pressable>
      )}
      <InputField
        ref={inputRef}
        placeholder="댓글을 남겨보세요."
        variant="Filled"
        value={comment}
        returnKeyType="send"
        onSubmitEditing={onSubmitEditing}
        onChangeText={(text) => setComment(text)}
        tailOptions={
          <CTAButton
            disabled={!comment}
            variant="Filled"
            title="전송"
            size="Small"
            onPress={onSubmitEditing}
          />
        }
      />
    </View>
  );
}

type DivierHeight = "big" | "hairline";

function Divider({ height }: { height: DivierHeight }) {
  return (
    <View
      style={[
        styles.divider,
        height === "big" ? { height: 20 } : { height: 1 },
      ]}
    />
  );
}

function useScrollToReplyTargetCommentEffect(
  isKeyboardVisible: boolean,
  replyTargetComment?: Comment,
  targetCommentLayout?: { y: number; height: number },
  scrollViewRef?: React.RefObject<ScrollView>,
) {
  useEffect(() => {
    if (
      !replyTargetComment ||
      !isKeyboardVisible ||
      !targetCommentLayout ||
      !scrollViewRef
    )
      return;

    requestAnimationFrame(() => {
      scrollViewRef.current.scrollTo({
        y: targetCommentLayout.y,
        animated: true,
      });
    });
  }, [
    isKeyboardVisible,
    replyTargetComment,
    targetCommentLayout,
    scrollViewRef,
  ]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  commentCountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputCommentContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.Grey_200,
    backgroundColor: colors.WHITE,
  },
  replyTargetCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.Grey_300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  replyTargetUsername: {
    backgroundColor: colors.ORANGE_600,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: colors.WHITE,
    maxWidth: "30%",
  },
  divider: {
    backgroundColor: colors.Grey_200,
  },
});
