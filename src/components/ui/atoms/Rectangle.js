import styled from "styled-components";
import { prop } from "styled-tools";

export const Rectangle = styled.section`
  background: #ffffff;
  border: 1px solid #dfe1e6;
  box-sizing: border-box;
  padding: ${prop("p", "25px")};
`;
