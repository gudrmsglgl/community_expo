import CTAButton from "@/components/CTAButton";
import RHFInputField from "@/components/form/RHFInputField";
import useAppToast from "@/hooks/useAppToast";
import useGetPost from "@/hooks/useGetPost";
import useUpdatePost from "@/hooks/useUpdatePost";
import { writePostSchema, WritePostSchema } from "@/schemas/writePostSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function EditPostScreen() {
  const showToast = useAppToast();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { data: post } = useGetPost(Number(id));
  const { mutate: updatePost } = useUpdatePost();

  const editPostForm = useForm<WritePostSchema>({
    resolver: zodResolver(writePostSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    formState: { isDirty, isValid },
    handleSubmit,
    reset,
  } = editPostForm;

  useEffect(() => {
    if (!post) return;

    reset(post);
  }, [post, reset]);

  const onSubmit = (data: WritePostSchema) => {
    updatePost(
      {
        id: Number(id),
        body: data,
      },
      {
        onSuccess: () => {
          navigation.goBack();
          showToast("게시글이 수정되었습니다.");
        },
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CTAButton
          title="저장"
          onPress={handleSubmit(onSubmit)}
          variant="Standard"
          size="Small"
          disabled={!isDirty}
        />
      ),
    });
  }, [navigation, isDirty, isValid, handleSubmit]);

  return (
    <FormProvider {...editPostForm}>
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
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});
