import { createContext, FC, ReactNode, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { AuthService } from "./../services/AuthService";
import { useState } from "react";
import { AxiosError } from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextValue {
  isLoading: boolean;
  isAuth: boolean;
  login: (creds: Credentials) => void;
  logout: () => void;
  checkAuth: () => Promise<any>;
  isErrorLogin: boolean,
  errorLoginMessage: string
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const useAuth = () => useContext(AuthContext);

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

  const { mutate: login, isError, error } = useMutation({
    mutationFn: ({ email, password }: Credentials) =>
      AuthService.login(email, password).then((res) => res.data),
    onSuccess: (data) => loginSuccess(data.accessToken),
  });

  const errorLogin = error as AxiosError
  const  errorLoginData = errorLogin?.response?.data as {message: string}
  const errorLoginMessage = errorLoginData?.message
  const isErrorLogin = isError && errorLogin?.response?.status === 400 ? true : false

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
    isErrorLogin,
    errorLoginMessage
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
