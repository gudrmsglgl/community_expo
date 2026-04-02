import useGetInfinitePosts from "@/hooks/useGetInfinitePosts";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { colors } from ".";
import FeedItem from "./FeedItem";

export default function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList>(null);

  useScrollToTop(ref);

  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat() || []}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <FeedItem post={item} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={async () => {
        setIsRefreshing(true);
        await refetch().finally(() => {
          setIsRefreshing(false);
        });
      }}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 24,
    gap: 12,
    backgroundColor: colors.Grey_200,
  },
});
