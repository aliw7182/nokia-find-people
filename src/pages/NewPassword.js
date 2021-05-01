import React from "react";
import { NewPasswordForm } from "../components/Login";
import LoginContainer from "../containers/LoginContainer";
import { useAuth } from "../context/auth/authContext";

export const NewPassword = () => {
  const { newPassword } = useAuth();

  return (
    <LoginContainer>
      <NewPasswordForm onSubmit={newPassword} />
    </LoginContainer>
  );
};
