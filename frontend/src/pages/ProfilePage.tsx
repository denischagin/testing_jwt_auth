import React from 'react'
import { useAuth } from './../context/AuthContext';

export const ProfilePage = () => {
  const { logout } = useAuth();


  const logoutHandler = () => {
    logout()
  }

  return (
    <div>
      <button onClick={logoutHandler}>Выйти из учетной записи</button>
    </div>
  )
}
