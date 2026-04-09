import useGetInfinitePosts from "@/hooks/useGetInfinitePosts";
import { Post } from "@/types";
import { useScrollToTop } from "@react-navigation/native";
import { ReactElement, RefObject, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { colors } from ".";
import FeedItem from "./FeedItem";

type FeedListViewProps = {
  posts: Post[];
  listRef?: RefObject<FlatList<Post> | null>;
  refreshing?: boolean;
  onRefresh?: () => void | Promise<void>;
  onEndReached?: () => void;
  renderFeedItem: (post: Post) => ReactElement;
};

export function FeedListView({
  posts,
  listRef,
  refreshing,
  onRefresh,
  onEndReached,
  renderFeedItem,
}: FeedListViewProps) {
  return (
    <FlatList
      ref={listRef}
      data={posts}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => renderFeedItem(item)}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

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
    <FeedListView
      listRef={ref}
      posts={posts?.pages.flat() || []}
      renderFeedItem={(post) => <FeedItem post={post} />}
      refreshing={isRefreshing}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onRefresh={async () => {
        setIsRefreshing(true);
        await refetch().finally(() => {
          setIsRefreshing(false);
        });
      }}
    />
    // <FlatList
    //   ref={ref}
    //   data={posts?.pages.flat() || []}
    //   contentContainerStyle={styles.contentContainer}
    //   keyExtractor={(item) => item.id.toString()}
    //   renderItem={({ item }) => <FeedItem post={item} />}
    //   onEndReached={() => {
    //     if (hasNextPage && !isFetchingNextPage) {
    //       fetchNextPage();
    //     }
    //   }}
    //   onEndReachedThreshold={0.5}
    //   refreshing={isRefreshing}
    //   onRefresh={async () => {
    //     setIsRefreshing(true);
    //     await refetch().finally(() => {
    //       setIsRefreshing(false);
    //     });
    //   }}
    // />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 24,
    gap: 12,
    backgroundColor: colors.Grey_200,
  },
});
