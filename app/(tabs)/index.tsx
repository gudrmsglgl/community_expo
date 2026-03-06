import ButtonComponents from "@/app/pages/ButtonComponents";
import TextButton from "@/components/TextButton";
import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const handlePress = () => {
    console.log("Home Screen Button Pressed");
  };

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <ButtonComponents />
      <TextButton title="Home Screen Button" onPress={handlePress} />
      <InputTextField />
    </SafeAreaView>
  );
}

function InputTextField() {
  const [text, setText] = useState("");

  const handleChangeText = (text: string) => {
    setText(text);
  };

  return (
    <TextInput
      value={text}
      style={inputTextStyles.container}
      placeholder="글을 입력해봐"
      onChangeText={handleChangeText}
    />
  );
}

const inputTextStyles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
});
