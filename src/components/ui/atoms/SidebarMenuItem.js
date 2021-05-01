import styled from "styled-components";
import { ifProp } from "styled-tools";

export const SidebarMenuItem = styled.div`
  a,
  button {
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    padding: 0px 0px 0px 16px;
    color: #42526e;
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    height: 40px;
    border-radius: 3px;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    opacity: ${ifProp("disabled", "0.5", "unset")};
    pointer-events: ${ifProp("disabled", "none", "unset")};

    &:hover, &:focus,
    &.active {
      color: #0052cc;
      background-color: rgba(9, 30, 66, 0.04);
      --icon-accent-color: #0052cc;
      outline: none;
    }
  }
`;
