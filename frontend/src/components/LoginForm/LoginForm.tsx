import { useAuth } from "../../hooks/useAuth";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EmailInput } from "../EmailInput/EmailInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";

type FormValues = {
  email: string;
  password: string;
  repeatPassword?: string
};

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, touchedFields },
    getValues,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const { login, isErrorLogin, errorLoginMessage } = useAuth();
  const onSubmit = (data: FormValues) => {
    login(data);
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
          Войдите в аккаунт:
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
            errors={errors}
            register={register}
            touchedFields={touchedFields}
          />

          <PasswordInput 
            errors={errors}
            register={register}
            touchedFields={touchedFields}
            minLength={0}
          />

          <Button variant="contained" type="submit" disabled={!isValid}>
            Войти
          </Button>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">
              Нет аккаунта?&nbsp;
              <Link to="/registration">Зарегистрироваться</Link>
            </Typography>

            {isErrorLogin && getValues().email && getValues().password && (
              <Typography variant="body1" color="rgb(255, 0, 0)">
                {errorLoginMessage}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
