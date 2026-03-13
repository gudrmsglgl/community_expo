import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from ".";
import { Post } from "../types";

interface FeedItemProps {
  post: Post;
}

export default function FeedItem({ post }: FeedItemProps) {
  const isLiked = true;
  return (
    <View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {post.description}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <IconItem count={10} isActive={isLiked}>
          <Octicons
            name={isLiked ? "heart-fill" : "heart"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
        </IconItem>
        <IconItem count={10}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={colors.BLACK}
          />
        </IconItem>
        <IconItem count={10}>
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
  container: {},
  contentContainer: {
    paddingHorizontal: 16,
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
