import React from "react";
import { LoginForm } from "../components/Login";
import LoginContainer from "../containers/LoginContainer";
import { useAuth } from "../context/auth/authContext";

function LoginPage() {
  const { login } = useAuth();

  return (
    <LoginContainer>
      <LoginForm onSubmit={login}/>
    </LoginContainer>
  );
}

export default LoginPage;
