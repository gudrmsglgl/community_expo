import { colors } from "@/components";
import EmailInput from "@/components/EmailInput";
import FixedButton from "@/components/FixedButton";
import PasswordInput from "@/components/PasswordInput";
import useAuth from "@/hooks/queries/useAuth";
import useKeyboardFocusCleanup from "@/hooks/useKeyboardFocusCleanup";
import { loginSchema, LoginSchema } from "@/schemas/loginSchemas";
import { ApiErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function LoginScreen() {
  const { loginMutation } = useAuth();
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data: LoginSchema) => {
    const focusedInput = TextInput.State?.currentlyFocusedInput?.();
    focusedInput?.blur?.();

    const { email, password } = data;
    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onError: (error) => {
          if (isAxiosError<ApiErrorResponse>(error)) {
            const data = error.response?.data;
            setErrorMessage(data?.message?.toString() ?? "");
          }
        },
      },
    );
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
            <EmailInput onFocus={() => setErrorMessage("")} />
            <PasswordInput onFocus={() => setErrorMessage("")} />
            {errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
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
  errorMessage: {
    color: colors.Red_500,
    fontSize: 12,
  },
});
