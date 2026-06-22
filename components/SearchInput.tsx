import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { colors } from ".";

interface SearchInputProps extends TextInputProps {
  onSubmit?: () => void;
}

export default function SearchInput({ onSubmit, ...props }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors.Grey_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        placeholder="placeholder"
        {...props}
      />
      <Ionicons
        name="search"
        size={20}
        onPress={props.onPress ?? onSubmit}
        color={colors.Grey_500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: colors.Grey_100,
    borderRadius: 100,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingLeft: 0,
    color: colors.BLACK,
  },
});
