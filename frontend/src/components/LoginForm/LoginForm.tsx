import { useState } from "react";
import { useAuth } from './../../context/AuthContext';
import { Box, Button, Container, TextField, Theme, Typography, makeStyles } from "@mui/material";
import { ThemeContext, useTheme } from "@emotion/react";
import { Link } from "react-router-dom";



export const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login, isErrorLogin, errorLoginMessage } = useAuth();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" mb={2}>
          Войдите в аккаунт:
        </Typography>
        <Box
          gap="10px"
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
          onSubmit={(e) => {
            e.preventDefault();
            login({ email, password })
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
          <Button variant="outlined" type="submit">Войти</Button>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">
              Нет аккаунта?&nbsp;
              <Link to="/registration">Зарегистрироваться</Link>
            </Typography>
            {isErrorLogin && <Typography variant="body1" color="rgb(255, 0, 0)">{errorLoginMessage}</Typography>}
          </Box>
        </Box>
      </Container>
    </Box>

  );
};
