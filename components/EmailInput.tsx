import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function EmailInput({
  onFocus = () => {},
}: {
  onFocus?: () => void;
}) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="email"
      control={control}
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
          onFocus={onFocus}
        />
      )}
    />
  );
}
