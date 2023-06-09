import { useAuth } from "../../hooks/useAuth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
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
          <TextField
            type="email"
            label="Почта"
            {...register("email", {
              required: "Поле обязательно к заполнению",
            })}
          />
          {errors?.email && (
            <Typography color="error" variant="body1">
              {errors?.email.message}
            </Typography>
          )}

          <TextField
            type="password"
            label="Пароль"
            {...register("password", {
              required: "Поле обязательно к заполнению",
            })}
          />
          {errors?.password && (
            <Typography color="error" variant="body1">
              {errors?.password.message}
            </Typography>
          )}

          <Button variant="contained" type="submit" disabled={!isValid}>
            Войти
          </Button>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">
              Нет аккаунта?&nbsp;
              <Link to="/registration">Зарегистрироваться</Link>
            </Typography>

            {isErrorLogin &&
              getValues().email.length !== 0 &&
              getValues().password.length !== 0 && (
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
