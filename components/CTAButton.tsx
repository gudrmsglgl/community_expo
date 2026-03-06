import {
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from "react-native";
import { colors } from "./index";

type ButtonVariant = "Filled" | "Outlined";
type ButtonSize = "Large" | "Medium" | "Small";

interface CTAButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function CTAButton({
  title,
  variant = "Filled",
  size = "Large",
  ...props
}: CTAButtonProps) {
  const disabled = props.disabled;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        disabled && styles[`disabled${variant}`],
      ]}
      android_ripple={{
        color: "rgba(255,255,255,0.35)",
        foreground: true,
      }}
      {...props}
    >
      <Text
        style={[
          variant === "Filled" ? styles.text : styles.textFiiled,
          disabled && variant === "Outlined" && styles.disabledText,
          size === "Large" ? styles.textLarge : styles.textSmall,
        ]}
        numberOfLines={1}
        ellipsizeMode={"tail"}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  Filled: {
    backgroundColor: colors.ORANGE_600,
  },
  disabledFilled: {
    backgroundColor: colors.Grey_300,
  },
  Outlined: {
    borderColor: colors.ORANGE_600,
    borderWidth: 2,
  },
  disabledOutlined: {
    borderColor: colors.Grey_300,
    borderWidth: 2,
  },
  Large: {
    width: "100%",
  },
  Medium: {
    width: 50,
    height: 38,
  },
  Small: {
    width: 40,
    height: 28,
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  text: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 12,
  },
  textEllipsize: {
    maxWidth: "100%",
  },
  textLarge: {
    paddingVertical: 11,
    fontSize: 14,
  },
  textFiiled: {
    color: colors.ORANGE_600,
    fontWeight: "bold",
  },
  disabledText: {
    color: colors.Grey_300,
    fontWeight: "bold",
  },
  pressed: {
    ...Platform.select({
      ios: { opacity: 0.7 },
      default: null,
    }),
  },
});
