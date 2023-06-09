import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { ProfilePage } from "./pages/ProfilePage";
import { getProtectedPage } from './helper/getProtectedPage';
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./hoc/AuthProvider";
import { wrapWithAuthRedirect } from "./helper/wrapWithAuthRedirect";

const App = () => {
  return (
    <div>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={wrapWithAuthRedirect(<LoginPage />)} />
            <Route path="/registration" element={wrapWithAuthRedirect(<RegistrationPage />)} />
            <Route path="/profile" element={getProtectedPage(<ProfilePage />)} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
