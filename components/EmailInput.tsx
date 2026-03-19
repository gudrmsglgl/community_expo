import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function EmailInput() {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (email: string) => {
          const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
          if (email.length === 0) {
            return "이메일을 입력해주세요.";
          }
          if (!emailRegex.test(email)) {
            return "올바른 이메일 형식을 입력해주세요.";
          }
          return true;
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          inputMode="email"
          value={value}
          onChangeText={onChange}
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => setFocus("password")}
          errorHint={error?.message}
        />
      )}
    />
  );
}
