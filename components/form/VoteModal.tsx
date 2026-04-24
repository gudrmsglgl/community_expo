import { WritePostSchema } from "@/schemas/writePostSchemas";
import { Ionicons } from "@expo/vector-icons";
import {
  Control,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "..";
import RHFInputField from "./RHFInputField";

export default function VoteModal() {
  const { control, setValue } = useFormContext<WritePostSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });

  // `useWatch`는 초기 렌더 타이밍에 `undefined`를 반환할 수 있어
  // UI에서 바로 `.map/.some`을 호출하면 런타임 크래시가 납니다.
  const voteOptions = useWatch({
    control,
    name: "voteOptions",
    defaultValue: [],
  });

  const isVoteOpen = useWatch({
    control,
    name: "isVoteOpen",
  });

  const insets = useSafeAreaInsets();

  const saveVote = () => {
    const hasEmptyVoteOptions = voteOptions.some(
      (voteOption) => voteOption.content.trim() === "",
    );

    if (fields.length < 2) {
      Alert.alert("투표 옵션은 최소 2개 이상 입력해주세요.");
      return;
    }

    if (hasEmptyVoteOptions) {
      Alert.alert("투표 옵션을 모두 입력해주세요.");
      return;
    }

    setValue("isVoteAttached", true);
    setValue("isVoteOpen", false);
  };

  return (
    <Modal visible={isVoteOpen} animationType={"slide"} transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <Appbar onSaveVote={saveVote} />
          {fields.map((field, index) => (
            <VoteInput
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
          <VoteAppendButton
            control={control}
            append={(maxPriority) =>
              append({ displayPriority: maxPriority + 1, content: "" })
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

function Appbar({ onSaveVote }: { onSaveVote: () => void }) {
  const { setValue } = useFormContext<WritePostSchema>();
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          setValue("isVoteOpen", false);
        }}
        style={styles.backButton}
      >
        <Ionicons name={"chevron-back"} size={24} color={colors.BLACK} />
      </Pressable>
      <Text style={styles.headerText}>투표</Text>
      <Text onPress={onSaveVote} style={styles.rightButton}>
        첨부
      </Text>
    </View>
  );
}

function VoteInput({
  index,
  onRemove,
}: {
  index: number;
  onRemove: (index: number) => void;
}) {
  return (
    <View style={styles.voteInputContainer}>
      <RHFInputField<WritePostSchema>
        name={`voteOptions.${index}.content`}
        placeholder="투표 옵션을 입력해주세요."
        variant="Standard"
        tailOptions={
          <Pressable onPress={() => onRemove(index)}>
            <Ionicons name={"close"} size={24} color={colors.BLACK} />
          </Pressable>
        }
      />
    </View>
  );
}

function VoteAppendButton({
  control,
  append,
}: {
  control: Control<WritePostSchema>;
  append: (maxPriority: number) => void;
}) {
  const voteOptions = useWatch({
    control,
    name: "voteOptions",
    defaultValue: [],
  });

  const maxPriority =
    voteOptions.length === 0
      ? 0
      : Math.max(...voteOptions.map((field) => field.displayPriority ?? 0));

  const maxId =
    voteOptions.length === 0
      ? 0
      : Math.max(...voteOptions.map((v) => v.id ?? 0));

  return (
    <Pressable
      style={styles.voteAppendButtonContainer}
      onPress={() => append(maxPriority)}
    >
      <Ionicons name={"add"} size={14} color={colors.Grey_500} />
      <Text style={{ fontWeight: "bold", color: colors.Grey_500 }}>
        항목 추가
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rightButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  backButton: {
    paddingVertical: 10,
  },
  voteInputContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  voteAppendButtonContainer: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
