import { memo } from "react";
import styled from "styled-components";
import { prop } from "styled-tools";

export const Title = memo(styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: ${prop("size", "20px")};
  line-height: 24px;
  color: #172B4D;
`);

