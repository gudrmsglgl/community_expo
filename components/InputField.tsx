import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "./index";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "Filled" | "Outlined" | "Standard";
  errorHint?: string;
}

export default function InputField({
  label,
  variant = "Filled",
  errorHint = "",
  ...props
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          styles[variant],
          Boolean(errorHint) && styles.error,
        ]}
        autoCorrect={false}
        autoCapitalize="none"
        spellCheck={false}
        {...props}
      />
      {Boolean(errorHint) && <Text style={styles.errorHint}>{errorHint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 12,
  },
  input: {
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  Filled: {
    backgroundColor: colors.Grey_100,
  },
  Standard: {
    borderWidth: 1,
    borderColor: colors.Grey_300,
  },
  error: {
    backgroundColor: colors.Red_100,
  },
  errorHint: {
    color: colors.Red_500,
    fontSize: 12,
  },
  Outlined: {
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
    color: colors.ORANGE_600,
    fontWeight: "bold",
    fontSize: 14,
  },
});
