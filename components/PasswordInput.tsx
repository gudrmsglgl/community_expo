import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function PasswordInput() {
  const { control } = useFormContext();
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
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          secureTextEntry
          onChangeText={onChange}
          errorHint={error?.message}
        />
      )}
    />
  );
}
