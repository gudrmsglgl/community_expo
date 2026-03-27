import RHFInputField from "@/components/form/RHFInputField";
import { writePostSchema, WritePostSchema } from "@/schemas/writePostSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function WriteScreen() {
  const writePostForm = useForm<WritePostSchema>({
    resolver: zodResolver(writePostSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <FormProvider {...writePostForm}>
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
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
