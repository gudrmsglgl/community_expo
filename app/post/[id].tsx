import { colors } from "@/components";
import CommentItem from "@/components/CommentItem";
import CTAButton from "@/components/CTAButton";
import { FeedItemView } from "@/components/FeedItem";
import InputField from "@/components/InputField";
import useAuth from "@/hooks/queries/useAuth";
import useCreateComment from "@/hooks/useCreateComment";
import useGetPost from "@/hooks/useGetPost";
import { Comment } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostScreen() {
  const {
    auth: { id: userId },
  } = useAuth();

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { id } = useLocalSearchParams();
  const { data: post, isLoading } = useGetPost(Number(id));
  const { mutate: createCommentMutation } = useCreateComment();

  if (isLoading) return <ActivityIndicator />;
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
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
            />
          </KeyboardAwareScrollView>

          <KeyboardStickyView>
            <BottomInputComment
              onSubmit={(text) => {
                createCommentMutation(
                  {
                    content: text,
                    postId: post.id,
                  },
                  {
                    onSuccess: () => {
                      setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                      }, 100);
                    },
                  },
                );
              }}
            />
          </KeyboardStickyView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

function CommentList({
  comments,
  currentUserId,
}: {
  comments: Comment[];
  currentUserId: number;
}) {
  return comments.map((comment, index) => (
    <View key={comment.id}>
      {index === 0 && <Divider height="hairline" />}
      <View style={{ marginBottom: 9 }}>
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
        />
      </View>

      {index !== comments.length - 1 && <Divider height="hairline" />}
    </View>
  ));
}

function BottomInputComment({
  onSubmit,
}: {
  onSubmit: (text: string) => void;
}) {
  const [comment, setComment] = useState("");

  const onSubmitEditing = () => {
    onSubmit(comment);
    setComment("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.inputCommentContainer}>
      <InputField
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.Grey_200,
  },
  divider: {
    backgroundColor: colors.Grey_200,
  },
});
