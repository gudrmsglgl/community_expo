import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import InputField from "./InputField";

interface Props {
  submitBehavior?: TextInputProps["submitBehavior"];
  returnKeyType?: TextInputProps["returnKeyType"];
  onFocus?: TextInputProps["onFocus"];
}

export default function PasswordInput({
  submitBehavior = "blurAndSubmit",
  returnKeyType = "none",
  onFocus = () => {},
}: Props) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          secureTextEntry
          onChangeText={onChange}
          textContentType="oneTimeCode"
          returnKeyType={returnKeyType}
          submitBehavior={submitBehavior}
          onSubmitEditing={() => setFocus("passwordConfirm")}
          errorHint={error?.message}
          onFocus={onFocus}
        />
      )}
    />
  );
}
