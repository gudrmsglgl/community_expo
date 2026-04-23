import { colors } from "@/components";
import CTAButton from "@/components/CTAButton";
import RHFInputField from "@/components/form/RHFInputField";
import ImagePreviewList from "@/components/ImagePreviewList";
import useCreatePost from "@/hooks/useCreatePost";
import useUploadImages from "@/hooks/useUploadImages";
import { writePostSchema, WritePostSchema } from "@/schemas/writePostSchemas";
import { getFormDataImages } from "@/utils/image";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WriteScreen() {
  const useCreatePostMutation = useCreatePost();

  const writePostForm = useForm<WritePostSchema>({
    resolver: zodResolver(writePostSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
    },
  });

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CTAButton
          title="저장"
          onPress={writePostForm.handleSubmit(onSubmit)}
          variant="Standard"
          size="Small"
        />
      ),
    });
  }, []);

  const onSubmit = (data: WritePostSchema) => {
    useCreatePostMutation.mutate(data);
  };

  return (
    <FormProvider {...writePostForm}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          bottomOffset={50}
          extraKeyboardSpace={16}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <RHFInputField<WritePostSchema>
              name="title"
              label="제목"
              nextFieldName="description"
              placeholder="제목을 입력해주세요."
            />
            <RHFInputField<WritePostSchema>
              name="description"
              label="내용"
              placeholder="내용을 입력해주세요."
              multiline
            />
            <ImagePreviewList imageUris={writePostForm.watch().imageUris} />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
      <Footer />
    </FormProvider>
  );
}

function Footer() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.Grey_300,
    flexDirection: "row",
    paddingTop: 12,
    bottom: 12,
    backgroundColor: colors.WHITE,
  },
});
