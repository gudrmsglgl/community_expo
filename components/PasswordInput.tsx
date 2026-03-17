import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function PasswordInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      render={({ field: { value, onChange } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
}
