import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";

export default function useAppToast() {
  const insets = useSafeAreaInsets();

  function successToast(message: string): void {
    toast.success(message, {
      position: "bottom-center",
      style: {
        marginBottom: insets.bottom + 16,
      },
    });
  }

  function warningToast(message: string): void {
    toast.warning(message, {
      position: "top-center",
    });
  }

  return {
    successToast,
    warningToast,
  };
}
