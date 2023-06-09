import React from "react";
import { Button, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { UserService } from "../services/UserService";

export const ProfilePage = () => {
  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
  };

  const {
    data: users,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.fetchUsers().then((res) => res.data),
    enabled: false,
  });

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={logoutHandler}>
        Выйти из учетной записи
      </Button>
      <Button variant="contained" color="primary" onClick={() => refetch()}>
        Получить список пользователей
      </Button>
      <div>
        {!isError &&
          users?.map((user) => (
            <Typography key={user.id}>{user.email}</Typography>
          ))}
      </div>
    </div>
  );
};
