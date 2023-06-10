import { LinearProgress } from '@mui/material';
import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

interface AuthorizedRedirectWrapperProps {
  children: ReactElement;
}

export const AuthorizedRedirectWrapper: FC<AuthorizedRedirectWrapperProps> = ({children}) => {
  const {isAuth, isLoading} = useAuth()
  if (isLoading) return <LinearProgress sx={{width: "100%"}}/>
	if (isAuth) return <Navigate to="/profile" replace/>
  return children
  
}
