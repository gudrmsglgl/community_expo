import { BASE_URL } from "@/api/axios";
import { colors } from "@/components";
import CTAButton from "@/components/CTAButton";
import TabPagerView from "@/components/TabPagerView";
import useGetAvatarItems from "@/hooks/useGetAvatarItems";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AvatarItemKey = "hats" | "skins" | "tops" | "bottoms" | "hands" | "faces";

type AvatarTabItem = {
  key: AvatarItemKey;
  title: string;
};

const AVATAR_TABS: AvatarTabItem[] = [
  { key: "hats", title: "모자" },
  { key: "skins", title: "피부" },
  { key: "tops", title: "상의" },
  { key: "bottoms", title: "하의" },
  { key: "hands", title: "손" },
  { key: "faces", title: "얼굴" },
] as const;

export default function AvatarScreen() {
  const navigation = useNavigation();

  const avatarQuries = useGetAvatarItems();
  const [selectedItem, setSelectedItem] = useState([
    {
      key: "",
      item: "",
    },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, [navigation]);

  const tabs = AVATAR_TABS.map((item) => item.title);

  return (
    <View style={{ flex: 1 }}>
      <TabPagerView tabs={tabs}>
        {AVATAR_TABS.map((tab) => (
          <View key={tab.key} style={styles.page}>
            <FlatList
              data={avatarQuries[tab.key]}
              contentContainerStyle={styles.listContainer}
              keyExtractor={(item, index) => `${tab.key}-${item}-${index}`}
              numColumns={3}
              renderItem={({ item }) => (
                <AvatarItem
                  imageUri={item}
                  isSelected={selectedItem[tab.key] === item}
                  onClick={() => {
                    setSelectedItem((prev) => ({
                      ...prev,
                      [tab.key]: item,
                    }));
                  }}
                />
              )}
            />
          </View>
        ))}
      </TabPagerView>
      <FooterSaveButton />
    </View>
  );
}

function AvatarItem({
  imageUri,
  isSelected,
  onClick,
}: {
  imageUri: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const uri = `${BASE_URL}/${imageUri}`;
  return (
    <Pressable
      style={[styles.avatarItem, isSelected && styles.avatarSelectedItem]}
      onPress={onClick}
    >
      <Image source={{ uri }} style={styles.avatarImage} resizeMode="contain" />
    </Pressable>
  );
}

function FooterSaveButton() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.footerButton, { marginBottom: insets.bottom }]}>
      <CTAButton title="저장하기" variant="Filled" size="Large" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginBottom: 50,
  },
  listContainer: {
    marginTop: 10,
    gap: 22,
    alignItems: "center",
    paddingBottom: 60,
  },
  avatarItem: {
    width: Dimensions.get("window").width / 3 - 15,
    height: Dimensions.get("window").width / 3 - 15,
    margin: 5,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.Grey_200,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSelectedItem: {
    borderColor: colors.ORANGE_600,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  footerButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 16,
  },
});
