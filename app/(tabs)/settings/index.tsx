import { colors } from "@/components";
import useAuth from "@/hooks/queries/useAuth";
import { saveDeviceLanguage } from "@/utils/secureStore";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Entypo, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { logout } = useAuth();
  const [shouldGoLogin, setShouldGoLogin] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const { i18n, t: translation } = useTranslation();

  const handlePressLanguage = () => {
    const options = ["English", "한국어", translation("common.cancel")];

    showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 0,
      },
      (index) => {
        switch (index) {
          case 0:
            i18n.changeLanguage("en");
            saveDeviceLanguage("en");
            break;
          case 1:
            i18n.changeLanguage("ko");
            saveDeviceLanguage("ko");
            break;
          case 2:
          default:
            break;
        }
      },
    );
  };

  useEffect(() => {
    if (shouldGoLogin) {
      router.replace("/auth");
    }

    return () => {
      setShouldGoLogin(false);
    };
  }, [shouldGoLogin]);

  return (
    <SafeAreaView>
      <ListItem
        title="언어설정"
        icon={<Entypo name="language" size={16} color={colors.BLACK} />}
        onPress={handlePressLanguage}
      />
      <View style={{ height: 30 }} />
      <ListItem
        title="로그아웃"
        onPress={() => {
          logout();
          setShouldGoLogin(true);
        }}
        icon={<Octicons name="sign-out" size={16} color={colors.BLACK} />}
      />
    </SafeAreaView>
  );
}

interface ListItemProps extends PressableProps {
  title: string;
  icon?: React.ReactNode;
}

function ListItem({ title, icon = null, ...props }: ListItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.listItemContainer,
        pressed && styles.pressedContainer,
      ]}
      {...props}
    >
      {icon}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: colors.WHITE,
    borderColor: colors.Grey_200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: colors.Grey_200,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.BLACK,
  },
});
