import { colors } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface TabConfig {
  routeName: string;
  title: string;
  focusedIconName: IconName;
  unfocusedIconName: IconName;
}

const TABS: TabConfig[] = [
  {
    routeName: "index",
    title: "Home",
    focusedIconName: "home-sharp",
    unfocusedIconName: "home-outline",
  },
  {
    routeName: "my",
    title: "내 프로필",
    focusedIconName: "person-circle",
    unfocusedIconName: "person-circle-outline",
  },
  {
    routeName: "settings",
    title: "설정",
    focusedIconName: "settings",
    unfocusedIconName: "settings-outline",
  },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.ORANGE_600,
        headerShown: false,
      }}
    >
      {TABS.map(({ routeName, ...tab }) => (
        <Tabs.Screen
          key={routeName}
          name={routeName}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? tab.focusedIconName : tab.unfocusedIconName}
                color={color}
                size={25}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
