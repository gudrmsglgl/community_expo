import EmailInput from "@/components/EmailInput";
import FixedButton from "@/components/FixedButton";
import PasswordInput from "@/components/PasswordInput";
import useKeyboardFocusCleanup from "@/hooks/useKeyboardFocusCleanup";
import { loginSchema, LoginSchema } from "@/schemas/loginSchemas";
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

export default function LoginScreen() {
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  useKeyboardFocusCleanup();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
    >
      <FormProvider {...loginForm}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <EmailInput />
            <PasswordInput />
          </View>
        </TouchableWithoutFeedback>
      </FormProvider>
      <FixedButton
        label="로그인하기"
        onPress={loginForm.handleSubmit(onSubmit)}
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
