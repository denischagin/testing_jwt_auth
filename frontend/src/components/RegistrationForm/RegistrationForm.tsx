import {
  Box,
  Button,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

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
    isLoading,
  } = useAuth();


  const onSubmit = (data: FormValues) => {
    regMutation(data);
  };

  if (isLoading) return <LinearProgress sx={{ width: "100%" }} />;

  console.log(errors?.repeatPassword);
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
          <TextField
            label="Почта"
            type="text"
            {...register("email", {
              required: "Поле обязательно к заполнению",
              pattern: emailRegex,
            })}
          />
          {errors?.email ? (
            <Typography color="error" variant="body1">
              {errors?.email.message || "Неправильный ввод почты"}
            </Typography>
          ) : (
            touchedFields.email && (
              <Typography color="green" variant="body1">
                Почта указана верно
              </Typography>
            )
          )}

          <TextField
            label="Пароль"
            type="password"
            {...register("password", {
              required: "Поле обязательно к заполнению",
              minLength: {
                value: 3,
                message: "Минимальная длина: 3",
              },
            })}
          />
          {errors?.password ? (
            <Typography color="error" variant="body1">
              {errors?.password?.message}
            </Typography>
          ) : (
            touchedFields.password && (
              <Typography color="green" variant="body1">
                Пароль указан верно
              </Typography>
            )
          )}

          <TextField
            label="Повторите пароль"
            type="password"
            {...register("repeatPassword", {
              validate: (value, formValues) =>
                value === formValues.password && value.length > 0,
            })}
          />
          {errors?.repeatPassword ? (
            <Typography color="error" variant="body1">
              Пароли не равны
            </Typography>
          ) : (
            touchedFields.repeatPassword && (
              <Typography color="green" variant="body1">
                Пароли равны
              </Typography>
            )
          )}

          <Button variant="contained" type="submit" disabled={!isValid}>
            Зарегистрироваться
          </Button>

          <Box display="flex" gap="10px"> 
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Уже есть аккаунт?&nbsp;
              <Link to="/login">Войти</Link>
            </Typography>

            {isErrorRegister &&
              getValues().email.length !== 0 &&
              getValues().password.length !== 0 && (
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
