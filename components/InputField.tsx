import { ForwardedRef, forwardRef, ReactElement } from "react";
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
  tailOptions?: ReactElement;
}

function InputField(
  {
    label,
    variant = "Filled",
    errorHint = "",
    tailOptions = undefined,
    ...props
  }: InputFieldProps,
  ref?: ForwardedRef<TextInput>,
) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          styles[variant],
          props.multiline && styles.multiline,
          Boolean(errorHint) && styles.error,
        ]}
      >
        <TextInput
          ref={ref}
          style={[styles.input]}
          autoCorrect={false}
          autoCapitalize="none"
          spellCheck={false}
          {...props}
        />
        <View style={styles.tailOptionsContainer}>{tailOptions}</View>
      </View>
      {Boolean(errorHint) && <Text style={styles.errorHint}>{errorHint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  inputContainer: {
    flexDirection: "row",
    height: 44,
  },
  label: {
    fontSize: 12,
  },
  input: {
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    flex: 1,
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
  multiline: {
    textAlignVertical: "top",
    height: 188,
    padding: 10,
  },
  tailOptionsContainer: {
    paddingHorizontal: 10,
    height: "100%",
    justifyContent: "center",
  },
});

export default forwardRef(InputField);
