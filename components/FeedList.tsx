import { Post } from "@/types";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { ReactElement, RefObject, useRef, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
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

export function InfinitePosts({
  hookFn,
}: {
  hookFn: () => UseInfiniteQueryResult<InfiniteData<Post[], unknown>, Error>;
}) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    error,
    refetch,
  } = hookFn();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const FeedListRef = useRef<FlatList | null>(null);

  if (isError) return <Text>{error.message}</Text>;

  return (
    <FeedListView
      posts={data?.pages.flat() || []}
      listRef={FeedListRef}
      renderFeedItem={(post) => <FeedItem post={post} />}
      refreshing={isRefreshing}
      onEndReached={() => {
        if (hasNextPage && !isLoading) {
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
  );
}

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

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 24,
    gap: 12,
    backgroundColor: colors.Grey_200,
  },
});
