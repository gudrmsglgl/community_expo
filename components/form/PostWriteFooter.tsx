import useUploadImages from "@/hooks/useUploadImages";
import { WritePostSchema } from "@/schemas/writePostSchemas";
import { getFormDataImages } from "@/utils/image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFormContext } from "react-hook-form";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "..";

export default function PostWriteFooter() {
  const insets = useSafeAreaInsets();
  const { mutate: uploadImageMutation } = useUploadImages();
  const { setValue, getValues } = useFormContext<WritePostSchema>();

  const addImageUrisToForm = (data: string[]) => {
    const currentImageUris = getValues("imageUris");
    if (currentImageUris.length + data.length > 5) {
      Alert.alert("이미지는 최대 5개까지 추가할 수 있습니다.");
      return;
    }

    setValue("imageUris", [
      ...currentImageUris,
      ...data.map((uri) => ({ uri })),
    ]);
  };

  const onPressCamera = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    const currentImageUris = getValues("imageUris");

    if (currentImageUris.length + result.assets.length > 5) {
      Alert.alert("이미지는 최대 5개까지 추가할 수 있습니다.");
      return;
    }

    const formData = getFormDataImages("images", result.assets);

    uploadImageMutation(formData, {
      onSuccess: (data) => {
        addImageUrisToForm(data);
      },
      onError: (error) => {
        console.log("error: ", error);
      },
    });
  };

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
      <Pressable onPress={onPressCamera}>
        <Ionicons name={"camera"} size={20} color={colors.BLACK} />
      </Pressable>
      <Pressable
        onPress={() => {
          setValue("isVoteOpen", true);
        }}
      >
        <MaterialCommunityIcons name={"vote"} size={20} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.Grey_300,
    flexDirection: "row",
    paddingTop: 12,
    bottom: 12,
    backgroundColor: colors.WHITE,
    gap: 16,
  },
});
