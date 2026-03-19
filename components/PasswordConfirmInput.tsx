import { Controller, useFormContext, useWatch } from "react-hook-form";
import InputField from "./InputField";

export default function PasswordConfirmInput() {
  const { control } = useFormContext();
  const password = useWatch({ control, name: "password" });
  return (
    <Controller
      name="passwordConfirm"
      control={control}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요."
          value={value}
          secureTextEntry
          textContentType="oneTimeCode"
          errorHint={error?.message}
          onChangeText={onChange}
        />
      )}
    />
  );
}
