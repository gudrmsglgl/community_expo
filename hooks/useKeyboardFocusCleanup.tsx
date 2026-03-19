import { useEffect, useRef } from "react";
import { Keyboard, TextInput } from "react-native";

export default function useKeyboardFocusCleanup() {
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
}
