import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { colors } from ".";
import InputField from "./InputField";

export default function VoteAttached({
  onRemoveVote,
}: {
  onRemoveVote: () => void;
}) {
  return (
    <InputField
      value="투표가 첨부되었습니다."
      variant="Outlined"
      editable={false}
      tailOptions={
        <Pressable onPress={onRemoveVote}>
          <Ionicons name={"close"} size={24} color={colors.BLACK} />
        </Pressable>
      }
    />
  );
}
