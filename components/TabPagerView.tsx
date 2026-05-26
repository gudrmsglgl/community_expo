import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { colors } from ".";

export default function TabPagerView({
  tabs,
  children,
}: {
  tabs: string[];
  children: React.ReactElement | React.ReactElement[];
}) {
  const pagerRef = useRef<PagerView>(null);

  const indicatorTranslateX = useSharedValue(0);
  const [tabWidth, setTabWidth] = useState(0);

  const pages = React.Children.toArray(children);

  if (tabs.length === 0) {
    throw new Error("TabPagerView requires at least one tab.");
  }

  if (tabs.length !== pages.length) {
    throw new Error(
      `TabPagerView expected tabs.length to match children count, but received ${tabs.length} tabs and ${pages.length} pages. Each tab must have exactly one page child.`,
    );
  }

  const onPressTab = (nextTab: number) => {
    pagerRef.current?.setPage(nextTab);
  };

  return (
    <>
      <TabView
        tabs={tabs}
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
        {children}
      </PagerView>
    </>
  );
}

function TabView({
  tabs,
  onPressTab,
  indicatorTranslateX,
  onTabWidthChange,
}: {
  tabs: string[];
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

  return (
    <View
      style={styles.tabContainer}
      onLayout={(e) => {
        if (tabs.length === 0) return;

        const w = e.nativeEvent.layout.width;
        const tabItemWidth = w / tabs.length;
        setTabWidth(tabItemWidth);
        onTabWidthChange(tabItemWidth);
      }}
    >
      <Animated.View
        pointerEvents={"none"}
        style={[styles.tabIndicator, { width: tabWidth }, indicatorTransXstyle]}
      />
      {tabs.map((title, index) => (
        <Pressable
          key={`title${index}`}
          style={styles.tabItem}
          onPress={() => onPressTab(index)}
        >
          <Text style={styles.tabItemText}>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
