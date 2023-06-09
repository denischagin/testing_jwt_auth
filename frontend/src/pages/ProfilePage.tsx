import React from "react";
import { useQuery } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { UserService } from "../services/UserService";

export const ProfilePage = () => {
  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
  };


  const { data: users, refetch, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.fetchUsers().then((res) => res.data),
    enabled: false,
  });

  return (
    <div>
      <button onClick={logoutHandler}>Выйти из учетной записи</button>
      <button onClick={() => refetch()}>Получить список пользователей</button>
      <div>
        {!isError && users?.map((user) => (
          <p>{user.email}</p>
        ))}
      </div>
    </div>
  );
};
