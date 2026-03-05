import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ButtonSectionProps {
  title: string;
  children: ReactNode;
  sectionSpacing?: number;
}

export default function ButtonSection({
  title,
  children,
  sectionSpacing = 24,
}: ButtonSectionProps) {
  return (
    <View style={{ marginBottom: sectionSpacing }}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  spacer: {
    marginBottom: 15,
  },
});
