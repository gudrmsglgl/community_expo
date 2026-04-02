import useAuth from "@/hooks/queries/useAuth";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from ".";
import { Post } from "../types";
import Profile from "./Profile";

interface FeedItemProps {
  post: Post;
}

export default function FeedItem({ post }: FeedItemProps) {
  const { auth } = useAuth();
  const isLiked = post.likes.some(
    (like) => Number(like.userId) === Number(auth.id),
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Profile
          onPress={() => {}}
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={post.createdAt}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {post.description}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <IconItem count={post.likes.length} isActive={isLiked}>
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
    </View>
  );
}

function IconItem({
  children,
  count,
  isActive = false,
}: {
  children: React.ReactNode;
  count: number;
  isActive?: boolean;
}) {
  return (
    <Pressable style={styles.iconItem}>
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
