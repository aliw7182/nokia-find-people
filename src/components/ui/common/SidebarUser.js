import React from "react";
import styled from "styled-components";
import { getLocalStorageUser } from "../../../context/auth/authProvider";
import { Avatar } from "../molecules/Avatar";

export const SidebarUser = () => {
  const user = getLocalStorageUser();
  return (
    user && (
      <SidebarUserContainer>
        <Avatar name={`${user.first_name} ${user.last_name}`} />
        <UserNameText>
          {user?.first_name[0].toUpperCase() + user?.first_name.substring(1)}{" "}
          {user?.last_name[0].toUpperCase() + user?.last_name.substring(1)}
        </UserNameText>
      </SidebarUserContainer>
    )
  );
};

const SidebarUserContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const UserNameText = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #6b778c;
  display: flex;
  align-items: center;
  margin-left: 9px;
`;
