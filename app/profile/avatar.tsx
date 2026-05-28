import { BASE_URL } from "@/api/axios";
import { colors } from "@/components";
import CTAButton from "@/components/CTAButton";
import TabPagerView from "@/components/TabPagerView";
import useAuth from "@/hooks/queries/useAuth";
import useAppToast from "@/hooks/useAppToast";
import useGetAvatarItems from "@/hooks/useGetAvatarItems";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AVATAR_ITEMS = [
  { key: "hats", title: "모자", apiKey: "hatId" },
  { key: "skins", title: "피부", apiKey: "skinId" },
  { key: "tops", title: "상의", apiKey: "topId" },
  { key: "bottoms", title: "하의", apiKey: "bottomId" },
  { key: "hands", title: "손", apiKey: "handId" },
  { key: "faces", title: "얼굴", apiKey: "faceId" },
] as const;

type AvatarItemApiKey = (typeof AVATAR_ITEMS)[number]["apiKey"];

type UserSelectedAvatarItems = Partial<Record<AvatarItemApiKey, string>>;

export default function AvatarScreen() {
  const navigation = useNavigation();
  const { successToast } = useAppToast();

  const { auth, authLoading, profileUpdateMutation } = useAuth();

  const avatarQuries = useGetAvatarItems();
  const { userSelectedAvatarItems, selectAvatarItem } = useAvatarSelection({
    auth,
    authLoading,
  });

  const onSubmitAvatarItems = () => {
    profileUpdateMutation.mutate(userSelectedAvatarItems, {
      onSuccess: () => {
        successToast("프로필 저장 완료됐습니다.");
        router.back();
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, [navigation]);

  const tabs = AVATAR_ITEMS.map((item) => item.title);

  return (
    <View style={{ flex: 1 }}>
      <TabPagerView tabs={tabs}>
        {AVATAR_ITEMS.map((tab) => (
          <View key={tab.key} style={styles.page}>
            <FlatList
              data={avatarQuries[tab.key]}
              contentContainerStyle={styles.listContainer}
              keyExtractor={(item, index) => `${tab.key}-${item}-${index}`}
              numColumns={3}
              renderItem={({ item }) => (
                <AvatarItem
                  imageUri={item}
                  isSelected={
                    userSelectedAvatarItems[tab.apiKey] === getImageId(item)
                  }
                  onClick={() => {
                    selectAvatarItem(tab.apiKey, item);
                  }}
                />
              )}
            />
          </View>
        ))}
      </TabPagerView>
      <FooterSaveButton onPress={onSubmitAvatarItems} />
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

function FooterSaveButton({ onPress }: { onPress: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.footerButton, { marginBottom: insets.bottom }]}>
      <CTAButton
        title="저장하기"
        variant="Filled"
        size="Large"
        onPress={onPress}
      />
    </View>
  );
}

function useAvatarSelection({
  auth,
  authLoading,
}: {
  auth: ReturnType<typeof useAuth>["auth"];
  authLoading: boolean;
}) {
  const [userSelectedAvatarItems, setUserSelectedAvatarItems] =
    useState<UserSelectedAvatarItems>({});
  const isInitialSelectedItem = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    if (isInitialSelectedItem.current) return;

    setUserSelectedAvatarItems({
      hatId: auth.hatId,
      faceId: auth.faceId,
      topId: auth.topId,
      handId: auth.handId,
      bottomId: auth.bottomId,
      skinId: auth.skinId,
    });

    isInitialSelectedItem.current = true;
  }, [
    auth.bottomId,
    auth.faceId,
    auth.handId,
    auth.hatId,
    auth.skinId,
    auth.topId,
    authLoading,
  ]);

  const selectAvatarItem = (apiKey: AvatarItemApiKey, imageUri: string) => {
    setUserSelectedAvatarItems((prev) => ({
      ...prev,
      [apiKey]: getImageId(imageUri),
    }));
  };

  return {
    userSelectedAvatarItems,
    selectAvatarItem,
  };
}

function getImageId(serverUrl: string) {
  const fileName = serverUrl.split("/").pop() ?? "";
  const [id] = fileName.split(".");
  return id;
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
