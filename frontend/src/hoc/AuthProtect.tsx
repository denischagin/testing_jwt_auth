import { LinearProgress } from "@mui/material";
import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface AuthProtectProps {
  children: ReactElement;
}

export const AuthProtect: FC<AuthProtectProps> = ({ children }) => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) return <LinearProgress sx={{width: "100%"}}/>
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};
