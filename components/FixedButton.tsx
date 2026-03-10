import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CTAButton from "./CTAButton";
import { colors } from "./index";

export default function FixedButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const insets = useSafeAreaInsets();

  const paddingBottom =
    Platform.OS === "android" ? insets.bottom + 5 : insets.bottom;

  return (
    <View style={[styles.container, { paddingBottom }]}>
      <CTAButton
        title={label}
        onPress={onPress}
        variant="Filled"
        size="Large"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.Grey_300,
    paddingTop: 12,
  },
});
