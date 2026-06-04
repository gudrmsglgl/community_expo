import { colors } from "@/components";
import useAuth from "@/hooks/queries/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { EventArg } from "@react-navigation/native";
import { router, Tabs } from "expo-router";
import React from "react";

type IconName = React.ComponentProps<typeof Ionicons>["name"];
type TabPressEvent = EventArg<"tabPress", true, undefined>;

interface TabConfig {
  routeName: "index" | "my" | "settings";
  title: string;
  focusedIconName: IconName;
  unfocusedIconName: IconName;
  protectedHref?: "/my" | "/settings";
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
    protectedHref: "/my",
  },
  {
    routeName: "settings",
    title: "설정",
    focusedIconName: "settings",
    unfocusedIconName: "settings-outline",
    protectedHref: "/settings",
  },
];

export default function TabLayout() {
  const { auth, authLoading, refetchAuth } = useAuth();

  const requireLoginOnTabPress =
    (href: "/my" | "/settings") =>
    async (e: TabPressEvent) => {
      e.preventDefault();

      if (authLoading) return;

      if (!auth.id) {
        router.push("/auth");
        return;
      }

      const result = await refetchAuth();

      if (result.isError || !result.data?.id) {
        router.push("/auth");
        return;
      }

      router.push(href);
    };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.ORANGE_600,
        headerShown: false,
      }}
    >
      {TABS.map(({ routeName, protectedHref, ...tab }) => (
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
          listeners={
            protectedHref
              ? {
                  tabPress: requireLoginOnTabPress(protectedHref),
                }
              : undefined
          }
        />
      ))}
    </Tabs>
  );
}
