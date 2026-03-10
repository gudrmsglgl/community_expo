import FixedButton from "@/components/FixedButton";
import InputField from "@/components/InputField";
import { useEffect, useRef } from "react";
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <InputField label="이메일" placeholder="이메일을 입력해주세요." />
          <InputField label="비밀번호" placeholder="비밀번호를 입력해주세요." />
          <InputField
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </View>
      </TouchableWithoutFeedback>
      <FixedButton label="회원가입하기" onPress={() => {}} />
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
