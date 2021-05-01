import React from "react";
import { ResetPasswordForm } from "../components/Login";
import LoginContainer from "../containers/LoginContainer";
import { useAuth } from "../context/auth/authContext";

export const ResetPassword = () => {
  const { reset } = useAuth();

  return (
    <LoginContainer>
      <ResetPasswordForm onSubmit={reset} />
    </LoginContainer>
  );
};
