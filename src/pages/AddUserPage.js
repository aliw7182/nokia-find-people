import React from "react";
import { Spacing, Title } from "../components/ui/atoms";
import { AddUserForm, UserBreadcrumbs } from "../components/Users";
import { useAuth } from "../context/auth/authContext";

export const AddUserPage = () => {
  const { sign } = useAuth();
  return (
    <>
      <Title>Users</Title>
      <Spacing m={{ t: "28px" }}>
        <UserBreadcrumbs text="Add User" />
      </Spacing>
      <AddUserForm onSubmit={sign} />
    </>
  );
};

