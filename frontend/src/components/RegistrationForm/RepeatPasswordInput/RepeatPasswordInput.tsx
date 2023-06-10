import { TextField } from "@mui/material";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../../types/forms";

interface RepeatPasswordInputProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  touchedFields: Partial<
    Readonly<{
      email?: boolean | undefined;
      password?: boolean | undefined;
      repeatPassword?: boolean | undefined;
    }>
  >;
}

export const RepeatPasswordInput: FC<RepeatPasswordInputProps> = ({
  register,
  errors,
  touchedFields,
}) => {
  return (
    <TextField
      label="Повторите пароль"
      type="password"
      {...register("repeatPassword", {
        validate: (value, formValues) =>
          value === formValues.password && value.length > 0,
      })}
      error={!!errors.repeatPassword}
      helperText={
        errors?.repeatPassword
          ? "Пароли не равны"
          : touchedFields.repeatPassword
          ? "Пароли равны"
          : "Повторите пароль"
      }
    />
  );
};
