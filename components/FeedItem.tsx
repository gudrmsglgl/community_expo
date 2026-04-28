import useAuth from "@/hooks/queries/useAuth";
import useAppToast from "@/hooks/useAppToast";
import useDeletePost from "@/hooks/useDeletePost";
import useLikePost from "@/hooks/useLikePost";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { NiceAvatarProps } from "@zamplyy/react-native-nice-avatar";
import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";
import { colors } from ".";
import { Post } from "../types";
import { DefaultRandomAvatar } from "./Avatar";
import ImagePreviewList from "./ImagePreviewList";
import Profile from "./Profile";
import {
  ProfileVoteParticipantBoard,
  VoteParticipationSummary,
} from "./votes/Votes";
dayjs.extend(relativeTime);

dayjs.locale(ko);
interface FeedItemProps {
  post: Post;
}

export default function FeedItem({ post }: FeedItemProps) {
  const { auth } = useAuth();
  const deletePostMutation = useDeletePost();
  const { successToast, warningToast } = useAppToast();
  const { mutate: likePostMutation } = useLikePost();

  const insets = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <FeedItemView
      post={post}
      currentUserId={Number(auth.id)}
      onPress={() => {
        router.push(`/post/${post.id}`);
      }}
      onPressLike={(postId) => {
        if (!auth.id) {
          warningToast("로그인 후 이용해주세요.");
          router.push("/auth/login");
          return;
        }
        likePostMutation(postId);
      }}
      onPressMore={() => {
        showActionSheetWithOptions(
          {
            options: ["삭제", "수정", "취소"],
            cancelButtonIndex: 2,
            destructiveButtonIndex: 0,
            textStyle: {
              flex: 1,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            },
            showSeparators: true,
            containerStyle: {
              paddingBottom: insets.bottom,
            },
          },
          (index) => {
            switch (index) {
              case 0:
                deletePostMutation.mutate(post.id.toString(), {
                  onSuccess: () => {
                    successToast("게시글이 삭제되었습니다.");
                  },
                });
                break;
              case 1:
                router.push(`/post/edit/${post.id}`);
                break;
              case 2:
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

type From = "home" | "profile";

export function FeedItemView({
  post,
  currentUserId,
  defaultUserAvatar = currentUserId == post.author.id && DefaultRandomAvatar,
  from = "home",
  onPress,
  onPressMore,
  onPressLike,
}: FeedItemProps & {
  currentUserId: number;
  defaultUserAvatar?: React.ComponentType<NiceAvatarProps | SvgProps>;
  from?: From;
  onPress?: () => void;
  onPressMore?: () => void;
  onPressLike?: (postId: number) => void;
}) {
  const isLiked = post.likes.some(
    (like) => Number(like.userId) === Number(currentUserId),
  );

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.profileContainer}>
        <Profile
          onPress={onPress}
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={dayjs(post.createdAt).fromNow()}
          option={
            onPressMore &&
            currentUserId === post.userId && (
              <Pressable onPress={onPressMore}>
                <AntDesign name="more" size={24} color="black" />
              </Pressable>
            )
          }
          defaultUserAvatar={defaultUserAvatar}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {post.description}
        </Text>
      </View>
      <View style={styles.imagePreviewListContainer}>
        <ImagePreviewList imageUris={post.imageUris} />
      </View>

      {post.hasVote && from === "home" && (
        <VoteParticipationSummary voteCount={post.voteCount} />
      )}

      {post.hasVote && from === "profile" && (
        <ProfileVoteParticipantBoard
          post={post}
          currentUserId={currentUserId}
        />
      )}

      <View style={styles.iconContainer}>
        <IconItem
          count={post.likes.length}
          isActive={isLiked}
          onPress={() => onPressLike?.(post.id)}
        >
          <Octicons
            name={isLiked ? "heart-fill" : "heart"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
        </IconItem>
        <IconItem count={post.commentCount}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={colors.BLACK}
          />
        </IconItem>
        <IconItem count={post.viewCount}>
          <Ionicons name="eye-outline" size={16} color="black" />
        </IconItem>
      </View>
    </Pressable>
  );
}

function IconItem({
  children,
  count,
  isActive = false,
  onPress,
}: {
  children: React.ReactNode;
  count: number;
  isActive?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.iconItem} onPress={onPress}>
      {children}
      <Text style={isActive ? styles.activeMenuText : styles.menuText}>
        {count}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  profileContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  imagePreviewListContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  title: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: "600",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
  },
  iconContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.Grey_300,
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  iconItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: colors.Grey_700,
  },
  activeMenuText: {
    fontWeight: "500",
    color: colors.ORANGE_600,
  },
});
