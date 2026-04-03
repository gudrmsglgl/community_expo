import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";

export default function useAppToast() {
  const insets = useSafeAreaInsets();

  return (message: string) =>
    toast.success(message, {
      position: "bottom-center",
      style: {
        marginBottom: insets.bottom + 16,
      },
    });
}
