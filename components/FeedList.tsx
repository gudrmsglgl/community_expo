import { FlatList, StyleSheet } from "react-native";
import { colors } from ".";
import { Post } from "../types";
import FeedItem from "./FeedItem";

export default function FeedList({ posts }: { posts: Post[] }) {
  return (
    <FlatList
      data={posts}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <FeedItem post={item} />}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    gap: 12,
    backgroundColor: colors.Grey_200,
  },
});
