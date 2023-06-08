import { FC, ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface AuthProtectProps {
  children: ReactElement;
}

export const AuthProtect: FC<AuthProtectProps> = ({ children }) => {
  const { isAuth, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return <p>Загрузка</p>;
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};