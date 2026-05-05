import { BASE_URL } from "@/api/axios";
import { colors } from "@/components";
import AuthRoute from "@/components/AuthRoute";
import { DefaultRandomAvatar } from "@/components/Avatar";
import CTAButton from "@/components/CTAButton";
import { InfinitePosts } from "@/components/FeedList";
import useAuth from "@/hooks/queries/useAuth";
import useGetLikedPosts from "@/hooks/useGetLikedPosts";
import useGetMyPosts from "@/hooks/useGetMyPosts";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function MyScreen() {
  const {
    auth: { thumbnailUri, nickname, introduce },
  } = useAuth();
  return (
    <AuthRoute>
      <View style={styles.header}>
        <Thumbnail thumbnailUri={thumbnailUri} />
        <View style={styles.profileEditTopButton}>
          <CTAButton variant={"Outlined"} title="프로필 편집" size={"Large"} />
        </View>
      </View>

      <View style={styles.container}>
        <ProfileContainer nickname={nickname} introduce={introduce} />
        <TabPagerView />
      </View>
    </AuthRoute>
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

function TabPagerView() {
  const pagerRef = useRef<PagerView>(null);

  const indicatorTranslateX = useSharedValue(0);
  const [tabWidth, setTabWidth] = useState(0);

  const onPressTab = (nextTab: number) => {
    pagerRef.current?.setPage(nextTab);
  };

  return (
    <>
      <TabView
        indicatorTranslateX={indicatorTranslateX}
        onTabWidthChange={setTabWidth}
        onPressTab={onPressTab}
      />
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        onPageScroll={(e) => {
          if (tabWidth <= 0) return;
          const { position, offset } = e.nativeEvent;
          indicatorTranslateX.value = (position + offset) * tabWidth;
        }}
        onPageSelected={(e) => {
          const pos = e.nativeEvent.position;

          if (tabWidth > 0) {
            indicatorTranslateX.value = pos * tabWidth;
          }
        }}
      >
        <MyFeeds key="1" />

        <LikedPosts key="2" />
      </PagerView>
    </>
  );
}

function MyFeeds() {
  return <InfinitePosts hookFn={useGetMyPosts} />;
}

function LikedPosts() {
  return <InfinitePosts hookFn={useGetLikedPosts} />;
}

function TabView({
  onPressTab,
  indicatorTranslateX,
  onTabWidthChange,
}: {
  onPressTab: (nextTab: number) => void;
  indicatorTranslateX: SharedValue<number>;
  onTabWidthChange: (w: number) => void;
}) {
  const [tabWidth, setTabWidth] = useState(0);

  const indicatorTransXstyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorTranslateX.value }],
    };
  });

  const handlePressTab = (nextTab: number) => {
    onPressTab(nextTab);
  };

  return (
    <View
      style={styles.tabContainer}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        const tabItemWidth = w / 2;
        setTabWidth(tabItemWidth);
        onTabWidthChange(tabItemWidth);
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={[styles.tabIndicator, { width: tabWidth }, indicatorTransXstyle]}
      />
      <Pressable style={styles.tabItem} onPress={() => handlePressTab(0)}>
        <Text style={styles.tabItemText}>게시물</Text>
      </Pressable>
      <Pressable style={styles.tabItem} onPress={() => handlePressTab(1)}>
        <Text style={styles.tabItemText}>좋아한 게시물</Text>
      </Pressable>
    </View>
  );
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
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    position: "relative",
  },
  tabItem: {
    flex: 1,
    borderBottomWidth: 0,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: colors.BLACK,
    borderRadius: 1,
  },
  tabItemText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 8,
  },
});
