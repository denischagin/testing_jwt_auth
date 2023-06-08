import React from 'react'
import { Navigate } from 'react-router';
import { LoginForm } from '../components/LoginForm/LoginForm'
import { useAuth } from './../context/AuthContext';

export const LoginPage = () => {
	const {isAuth} = useAuth()
	if (isAuth) return <Navigate to="/profile" replace/>
	return (
		<div>
			<LoginForm />
		</div>
	)
}
