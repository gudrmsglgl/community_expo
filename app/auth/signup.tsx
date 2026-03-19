import EmailInput from "@/components/EmailInput";
import FixedButton from "@/components/FixedButton";
import PasswordConfirmInput from "@/components/PasswordConfirmInput";
import PasswordInput from "@/components/PasswordInput";
import useKeyboardFocusCleanup from "@/hooks/useKeyboardFocusCleanup";
import { FormProvider, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignupScreen() {
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  useKeyboardFocusCleanup();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
    >
      <FormProvider {...signupForm}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <EmailInput />
            <PasswordInput submitBehavior="submit" returnKeyType="next" />
            <PasswordConfirmInput />
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
