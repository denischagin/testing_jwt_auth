import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { EmailInput } from "../EmailInput/EmailInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { RepeatPasswordInput } from "./RepeatPasswordInput/RepeatPasswordInput";
import { FormValues } from "../../types/forms";

export const RegistrationForm = () => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    getValues,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const {
    register: regMutation,
    isErrorRegister,
    errorRegisterMessage,
  } = useAuth();

  const onSubmit = (data: FormValues) => {
    regMutation(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" mb={2}>
          Создайте аккаунт:
        </Typography>

        <Box
          gap="10px"
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <EmailInput
            register={register}
            errors={errors}
            touchedFields={touchedFields}
            emailRegex={emailRegex}
          />

          <PasswordInput
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />

          <RepeatPasswordInput
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />

          <Button variant="contained" type="submit" disabled={!isValid}>
            Зарегистрироваться
          </Button>

          <Box display="flex" gap="10px">
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Уже есть аккаунт?&nbsp;
              <Link to="/login">Войти</Link>
            </Typography>

            {isErrorRegister && getValues().email && getValues().password && (
              <Typography
                variant="body1"
                color="rgb(255, 0, 0)"
                sx={{ maxWidth: "300px" }}
              >
                {errorRegisterMessage}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
