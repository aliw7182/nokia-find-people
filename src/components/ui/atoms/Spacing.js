import styled from "styled-components";
import { withProp } from "styled-tools";

const spacingToString = (value) => {
  if (!value) {
    return "0rem";
  } else if (typeof value === "string") {
    return value;
  } else {
    const { t = "0rem", r = "0rem", b = "0rem", l = "0rem" } = value;

    return `${t} ${r} ${b} ${l}`;
  }
};

export const Spacing = styled.div`
  padding: ${withProp("p", spacingToString)};
  margin: ${withProp("m", spacingToString)};
`;
