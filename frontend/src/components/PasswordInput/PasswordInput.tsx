import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { FC, MouseEventHandler, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/forms";

interface PasswordInputProps {
  register: UseFormRegister<any>;
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
  minLength?: {value: number, message: string} | number
}

export const PasswordInput: FC<PasswordInputProps> = ({
  register,
  errors,
  touchedFields,
  defaultValue = "Введите пароль",
  successValue = "Пароль указан верно",
  required = "Поле обязательно к заполнению",
  minLength = {
    value: 3,
    message: "Минимальная длина: 3 символа",
  }
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      label="Пароль"
      type={showPassword ? "text" : "password"}
      {...register("password", {
        required: required,
        minLength: minLength,
      })}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={!!errors.password}
      helperText={
        errors?.password
          ? errors?.password.message
          : touchedFields.password
          ? successValue
          : defaultValue
      }
    />
  );
};
