import FixedButton from "@/components/FixedButton";
import InputField from "@/components/InputField";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SignupScreen() {
  const [signupValue, setSignupValue] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChangeValue = (key: string, value: string) => {
    setSignupValue((prev) => ({ ...prev, [key]: value }));
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

  const onSubmit = () => {
    console.log("submit", signupValue);
    if (signupValue.email.length >= 0 && !signupValue.email.includes("@")) {
      console.log("이메일 형식에 맞게 입력해주세요.");
      setError((prev) => ({
        ...prev,
        email: "이메일 형식에 맞게 입력해주세요.",
      }));
      return;
    }

    if (signupValue.password.length >= 0 && signupValue.password.length < 8) {
      console.log("비밀번호는 8자 이상 입력해주세요.");
      setError({ ...error, password: "비밀번호는 8자 이상 입력해주세요." });
      return;
    }

    if (signupValue.password.length >= 9) {
      console.log("비밀번호는 8자 이하로 입력해주세요.");
      setError({ ...error, password: "비밀번호는 8자 이하로 입력해주세요." });
      return;
    }

    console.log("signupValue", signupValue);
    console.log("error", error);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <InputField
            label="이메일"
            placeholder="이메일을 입력해주세요."
            value={signupValue.email}
            onChangeText={(text) => {
              if (text.length > 0 && text.includes("@")) {
                setError((prev) => ({ ...prev, email: "" }));
              }
              handleChangeValue("email", text);
            }}
            errorHint={error.email}
          />
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            value={signupValue.password}
            onChangeText={(text) => {
              if (text.length > 0 && text.length <= 8) {
                setError((prev) => ({ ...prev, password: "" }));
              }
              handleChangeValue("password", text);
            }}
            errorHint={error.password}
          />
          <InputField
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            value={signupValue.passwordConfirm}
            onChangeText={(text) => handleChangeValue("passwordConfirm", text)}
            errorHint={error.passwordConfirm}
          />
        </View>
      </TouchableWithoutFeedback>
      <FixedButton label="회원가입하기" onPress={() => onSubmit()} />
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
