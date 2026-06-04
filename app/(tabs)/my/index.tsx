import { BASE_URL } from "@/api/axios";
import { colors } from "@/components";
import { DefaultRandomAvatar } from "@/components/Avatar";
import CTAButton from "@/components/CTAButton";
import { InfinitePosts } from "@/components/FeedList";
import TabPagerView from "@/components/TabPagerView";
import useAuth from "@/hooks/queries/useAuth";
import useGetLikedPosts from "@/hooks/useGetLikedPosts";
import useGetMyPosts from "@/hooks/useGetMyPosts";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function MyScreen() {
  const {
    auth: { thumbnailUri, nickname, introduce },
  } = useAuth();
  return (
    <>
      <View style={styles.header}>
        <Thumbnail thumbnailUri={thumbnailUri} />
        <View style={styles.profileEditTopButton}>
          <CTAButton
            variant={"Outlined"}
            title="프로필 편집"
            size={"Large"}
            onPress={() => router.push("/profile/update")}
          />
        </View>
      </View>

      <View style={styles.container}>
        <ProfileContainer nickname={nickname} introduce={introduce} />
        <TabPagerView tabs={["게시물", "좋아한 게시물"]}>
          <MyFeeds key="1" />
          <LikedPosts key="2" />
        </TabPagerView>
      </View>
    </>
  );
}

function Thumbnail({ thumbnailUri }: { thumbnailUri: string }) {
  return thumbnailUri ? (
    <Image
      source={{ uri: `${BASE_URL}/${thumbnailUri}` }}
      style={styles.thumbnail}
    />
  ) : (
    <DefaultRandomAvatar style={styles.thumbnail} />
  );
}

function ProfileContainer({
  nickname,
  introduce,
}: {
  nickname: string;
  introduce?: string;
}) {
  return (
    <View style={styles.profileContainer}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>{nickname}</Text>
      {introduce && <Text>{introduce}</Text>}
    </View>
  );
}

function MyFeeds() {
  return <InfinitePosts hookFn={useGetMyPosts} />;
}

function LikedPosts() {
  return <InfinitePosts hookFn={useGetLikedPosts} />;
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 154,
    backgroundColor: colors.ORANGE_200,
  },
  profileEditTopButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  thumbnail: {
    position: "absolute",
    top: 78,
    width: 150,
    height: 150,
    marginStart: 16,
    borderRadius: 114,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#6B6B6B",
  },
  container: {
    flex: 1,
    marginTop: 75,
  },
  profileContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
});
