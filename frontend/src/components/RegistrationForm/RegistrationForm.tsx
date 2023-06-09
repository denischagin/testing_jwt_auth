import { FormEvent, useState } from "react";
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

export const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, isErrorRegister, errorRegisterMessage, isLoading } =
    useAuth();

  if (isLoading) return <LinearProgress sx={{ width: "100%" }} />;

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
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            register({ email, password });
          }}
        >
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Почта"
          />

          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Пароль"
          />

          <Button variant="contained" type="submit">
            Зарегистрироваться
          </Button>

          <Box display="flex" gap="10px">
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Уже есть аккаунт?&nbsp;
              <Link to="/login">Войти</Link>
            </Typography>

            {isErrorRegister && (
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
