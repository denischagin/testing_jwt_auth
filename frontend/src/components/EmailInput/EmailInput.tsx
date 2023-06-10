import { TextField } from "@mui/material";
import React, { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/forms";


interface EmailInputProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  touchedFields: Partial<
    Readonly<{
      email?: boolean | undefined;
      password?: boolean | undefined;
      repeatPassword?: boolean | undefined;
    }>
  >;
  defaultValue?: string;
  successValue?: string;
  required?: string | boolean;
  errorPatternValue?: string
  emailRegex?: RegExp 
}

export const EmailInput: FC<EmailInputProps> = ({ 
  register, 
  errors, 
  touchedFields, 
  defaultValue = "Введите почту",
  successValue = "Почта указана верно",
  required = "Поле обязательно к заполнению",
  errorPatternValue = "Неправильный ввод почты",
  emailRegex
}) => {
  

  return (
    <TextField
      label="Почта"
      type="text"
      {...register("email", {
        required: required,
        pattern: emailRegex ?? undefined,
      })}
      error={!!errors.email}
      helperText={
        errors?.email
          ? errors?.email.message || errorPatternValue
          : touchedFields.email
          ? successValue
          : defaultValue
      }
    />
  );
};
