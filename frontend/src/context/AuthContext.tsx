import { createContext, FC, ReactNode, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { AuthService } from "./../services/AuthService";
import { useState } from "react";

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
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginSuccess = (token: string) => {
    setIsAuth(true);
    localStorage.setItem("token", token);
    console.log('set token')
  };

  const logoutSuccess = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }: Credentials) =>
      AuthService.login(email, password).then((res) => res.data),
    onSuccess: (data) => loginSuccess(data.accessToken),
  });


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
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
