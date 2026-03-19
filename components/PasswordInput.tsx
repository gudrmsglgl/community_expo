import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import InputField from "./InputField";

interface Props {
  submitBehavior?: TextInputProps["submitBehavior"];
  returnKeyType?: TextInputProps["returnKeyType"];
}

export default function PasswordInput({
  submitBehavior = "blurAndSubmit",
  returnKeyType = "none",
}: Props) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (password: string) => {
          if (password.length < 8) {
            return "비밀번호는 8자 이상 입력해주세요.";
          }
          return true;
        },
      }}
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
        />
      )}
    />
  );
}
