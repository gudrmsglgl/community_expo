import { BASE_URL } from "@/api/axios";
import queryClient from "@/api/queryClient";
import { colors } from "@/components";
import { DefaultRandomAvatar } from "@/components/Avatar";
import FeedItemSkleton from "@/components/FeedItemSkleton";
import { InfinitePosts } from "@/components/FeedList";
import { Skeleton } from "@/components/Skeleton";
import useGetUserPosts from "@/hooks/useGetUserPosts";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const userId = Number(id);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, [navigation]);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          resetKeys={[userId]}
          fallbackRender={({ resetErrorBoundary }) => (
            <ProfileErrorFallback onRetry={resetErrorBoundary} />
          )}
        >
          <Suspense fallback={<ProfileContentSkeleton />}>
            <ProfileContents id={userId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function ProfileContentSkeleton() {
  return (
    <View>
      <Skeleton height={10} style={styles.thumbnailImage} />
      <View style={styles.skletonContainer}>
        {Array.from({ length: 3 }, (_, index) => (
          <FeedItemSkleton key={index} />
        ))}
      </View>
    </View>
  );
}

function ProfileErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>프로필 정보를 불러오지 못했습니다.</Text>
      <Pressable style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>다시 시도</Text>
      </Pressable>
    </View>
  );
}

function ProfileContents({ id }: { id: number }) {
  const { data } = useGetUserProfile(Number(id));

  useEffect(() => {
    const query = queryClient.getQueryCache().find({
      queryKey: ["auth", "getUserProfile", id],
    });

    console.log(
      "ProfileContents profile observers",
      query?.getObserversCount(),
    );
  }, [data]);

  return (
    <>
      <View style={styles.header}>
        <Thumbnail thumbnailUri={data?.imageUri} />
      </View>
      <View style={styles.container}>
        <UserProfile nickname={data?.nickname} introduce={data?.introduce} />
        <TabView>
          <MyFeeds userId={Number(id)} />
        </TabView>
      </View>
    </>
  );
}

function MyFeeds({ userId }: { userId: number }) {
  return <InfinitePosts hookFn={() => useGetUserPosts(userId)} />;
}

function UserProfile({
  nickname,
  introduce,
}: {
  nickname: string;
  introduce?: string;
}) {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.nickname}>{nickname}</Text>
      {introduce && <Text>{introduce}</Text>}
    </View>
  );
}

function Thumbnail({ thumbnailUri }: { thumbnailUri?: string }) {
  if (!thumbnailUri)
    return <DefaultRandomAvatar style={styles.thumbnailImage} />;

  return (
    <Image
      source={{ uri: `${BASE_URL}/${thumbnailUri}` }}
      style={styles.thumbnailImage}
    />
  );
}

function TabView({ children }: { children: React.ReactNode }) {
  return (
    <View>
      <View style={styles.tabView}>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            paddingVertical: 8,
          }}
        >
          게시물
        </Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.ORANGE_200,
    height: 98,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.Grey_500,
    textAlign: "center",
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.ORANGE_200,
    borderRadius: 12,
  },
  retryButtonText: {
    fontWeight: "bold",
  },
  thumbnailImage: {
    width: 152,
    height: 152,
    borderRadius: 114,
    marginTop: 20,
    marginStart: 16,
  },
  skletonContainer: {
    marginTop: 76,
    gap: 50,
  },
  container: {
    marginTop: 76,
  },
  profileContainer: {
    marginTop: 16,
    marginStart: 16,
  },
  nickname: {
    fontSize: 28,
    fontWeight: "bold",
  },
  tabView: {
    width: "100%",
    borderBottomWidth: 1.5,
  },
});
