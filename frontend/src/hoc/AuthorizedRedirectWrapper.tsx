import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

interface AuthorizedRedirectWrapperProps {
  children: ReactElement;
}

export const AuthorizedRedirectWrapper: FC<AuthorizedRedirectWrapperProps> = ({children}) => {
  const {isAuth} = useAuth()
	if (isAuth) return <Navigate to="/profile" replace/>
  return children
  
}
