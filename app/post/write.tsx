import CTAButton from "@/components/CTAButton";
import RHFInputField from "@/components/form/RHFInputField";
import useCreatePost from "@/hooks/useCreatePost";
import { writePostSchema, WritePostSchema } from "@/schemas/writePostSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

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
