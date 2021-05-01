import React from "react";
import styled from "styled-components";
import { localStorageKey } from "../../../utils/requestHandler";

export const SidebarTemplate = ({ sidebar }) => {
  return (
    window.localStorage.getItem(localStorageKey) && <SidebarContainer>{sidebar}</SidebarContainer>
  );
};

export const SidebarContainer = styled.div`
  width: 240px;
  flex: 0 0 240px;
  position: sticky;
  top: 0;
  padding: 17px 16px;
  height: 100vh;
  background-color: #f4f5f7;
`;
