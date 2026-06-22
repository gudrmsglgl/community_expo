import { Post } from "@/types";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import { ReactElement, RefObject, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from ".";
import FeedItem from "./FeedItem";

type FeedListViewProps = {
  posts: Post[];
  listRef?: RefObject<FlatList<Post> | null>;
  refreshing?: boolean;
  onRefresh?: () => void | Promise<void>;
  onEndReached?: () => void;
  renderFeedItem: (post: Post) => ReactElement;
  ListEmptyComponent?: ReactElement | null;
};

type InfiniteHookFn =
  | (() => UseInfiniteQueryResult<InfiniteData<Post[], unknown>, Error>)
  | (() => UseSuspenseInfiniteQueryResult<
      InfiniteData<Post[], unknown>,
      Error
    >);

export function InfinitePosts({ hookFn }: { hookFn: InfiniteHookFn }) {
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
  const posts = data?.pages.flat() || [];

  return (
    <FeedListView
      posts={posts}
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
      ListEmptyComponent={
        !isLoading ? (
          <View style={styles.emptyContainer}>
            <Text>조회된 게시글이 없습니다.</Text>
          </View>
        ) : null
      }
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
  ListEmptyComponent,
}: FeedListViewProps) {
  return (
    <FlatList
      ref={listRef}
      data={posts}
      contentContainerStyle={[
        styles.contentContainer,
        posts.length === 0 && styles.emptyContainer,
      ]}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => renderFeedItem(item)}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 24,
    gap: 12,
    backgroundColor: colors.Grey_200,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.WHITE,
  },
});
