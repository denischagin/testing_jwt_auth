import { FC, ReactNode } from "react";
import { useMutation, useQuery } from "react-query";
import { AuthService } from "./../services/AuthService";
import { useState } from "react";
import { AxiosError } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { AuthContext } from "../context/AuthContext";
import { AuthContextValue, Credentials } from "../types/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginSuccess = (token: string) => {
    setIsAuth(true);
    localStorage.setItem("token", token);
  };

  const logoutSuccess = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  const { mutate: login, isError: isErrorLogin, error: errorLogin } = useMutation<AuthResponse, AxiosError<{message: string}>, Credentials, unknown>({
    mutationFn: ({ email, password }: Credentials) =>
      AuthService.login(email, password).then((res) => res.data),
    onSuccess: (data) => loginSuccess(data.accessToken),
  });

  const { mutate: register, isError: isErrorRegister, error: errorRegister } = useMutation<AuthResponse, AxiosError<{message: string}>, Credentials, unknown>({
    mutationFn: ({ email, password }: Credentials) =>
      AuthService.registration(email, password).then((res) => res.data),
    onSuccess: (data) => loginSuccess(data.accessToken),
  });

  const errorLoginData = errorLogin?.response?.data as {message: string}
  const errorLoginMessage = errorLoginData?.message ?? null

  const errorRegisterData = errorRegister?.response?.data as {message: string}
  const errorRegisterMessage = errorRegisterData?.message ?? null

  const { mutate: logout } = useMutation({
    mutationFn: () => AuthService.logout().then(),
    onSuccess: logoutSuccess,
  });

  const { isLoading, refetch: checkAuth } = useQuery({
    queryKey: ['token'],
    queryFn: () => AuthService.refresh().then((res) => res.data),
    onSuccess: (data) => loginSuccess(data.accessToken),
    onError: () => setIsAuth(false),
    retry: false,
    refetchOnWindowFocus: false
  });

  const authContextValue: AuthContextValue = {
    isLoading,
    isAuth,
    login,
    logout,
    checkAuth,
    register,
    isErrorLogin,
    errorLoginMessage,
    isErrorRegister,
    errorRegisterMessage
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};