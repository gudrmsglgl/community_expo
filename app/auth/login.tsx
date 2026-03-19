import EmailInput from "@/components/EmailInput";
import FixedButton from "@/components/FixedButton";
import PasswordInput from "@/components/PasswordInput";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  const isKeyboardVisible = useRef(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      isKeyboardVisible.current = true;
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      if (!isKeyboardVisible.current) {
        return;
      }

      isKeyboardVisible.current = false;
      const focusedInput = (TextInput as any).State?.currentlyFocusedInput?.();
      focusedInput?.blur?.();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
