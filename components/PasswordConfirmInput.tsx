import { Controller, useFormContext, useWatch } from "react-hook-form";
import InputField from "./InputField";

export default function PasswordConfirmInput() {
  const { control } = useFormContext();
  const password = useWatch({ control, name: "password" });
  return (
    <Controller
      name="passwordConfirm"
      control={control}
      rules={{
        validate: (passwordConfirm: string) => {
          if (passwordConfirm !== password) {
            return "비밀번호가 일치하지 않습니다.";
          }
          return true;
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
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
