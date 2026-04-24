import { ReactElement } from "react";
import {
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
import { TextInputProps } from "react-native";
import InputField from "../InputField";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  nextFieldName?: FieldPath<T>;
  variant?: "Filled" | "Outlined" | "Standard";
  tailOptions?: ReactElement;
} & TextInputProps;

export default function RHFInputField<T extends FieldValues>({
  name,
  label,
  nextFieldName,
  variant = "Filled",
  tailOptions,
  returnKeyType,
  ...props
}: Props<T>) {
  const { control, setFocus } = useFormContext<T>();

  const {
    field: { ref, value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <InputField
      ref={ref}
      label={label}
      variant={variant}
      value={value ?? ""}
      onChangeText={onChange}
      errorHint={error?.message}
      submitBehavior={nextFieldName ? "submit" : undefined}
      returnKeyType={nextFieldName ? "next" : returnKeyType}
      onSubmitEditing={() => nextFieldName && setFocus(nextFieldName)}
      tailOptions={tailOptions}
      {...props}
    />
  );
}
