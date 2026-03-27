import FixedButton from "@/components/FixedButton";
import RHFInputField from "@/components/form/RHFInputField";
import useAuth from "@/hooks/queries/useAuth";
import useKeyboardFocusCleanup from "@/hooks/useKeyboardFocusCleanup";
import { signupSchema, SignupSchema } from "@/schemas/signupSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SignupScreen() {
  const { signupMutation } = useAuth();
  const signupForm = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  useKeyboardFocusCleanup();

  const onSubmit = (data: SignupSchema) => {
    const { email, password } = data;
    signupMutation.mutate({
      email,
      password,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
    >
      <FormProvider {...signupForm}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <RHFInputField<SignupSchema>
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요."
              inputMode="email"
              nextFieldName="password"
            />
            <RHFInputField<SignupSchema>
              name="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              secureTextEntry
              textContentType="oneTimeCode"
            />
            <RHFInputField<SignupSchema>
              name="passwordConfirm"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요."
              secureTextEntry
              textContentType="oneTimeCode"
            />
          </View>
        </TouchableWithoutFeedback>
      </FormProvider>

      <FixedButton
        label="회원가입하기"
        onPress={() => {
          signupForm.handleSubmit(onSubmit)();
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
});
