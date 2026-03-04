import { Platform, Pressable, StyleSheet, Text } from "react-native";

export default function TextButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: "rgba(255,255,255,0.35)",
        foreground: true,
      }}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingEnd: 10,
    paddingTop: 20,
    paddingStart: 20,
    marginHorizontal: "auto",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "blue",
    alignItems: "center",
  },
  pressed: {
    ...Platform.select({
      ios: { opacity: 0.7 },
      default: null,
    }),
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
