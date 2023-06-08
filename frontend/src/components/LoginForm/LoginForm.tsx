import { useState } from "react";
import { useAuth } from './../../context/AuthContext';

export const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login } = useAuth();


  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      login({email, password})
    }}>
			<input
				type="text"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Введите почту"
			/>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
				placeholder="Введите пароль"
      />
			<button type="submit">Войти</button>
    </form>
  );
};
