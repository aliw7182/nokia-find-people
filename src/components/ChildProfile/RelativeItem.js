import Tooltip from "@atlaskit/tooltip";
import React from "react";
import styled from "styled-components";
import { Box, Label, Spacing } from "../ui/atoms";
import { Avatar } from "../ui/molecules/Avatar";
import { RelativeTooltip } from "./RelativeTooltip";

export const RelativeItem = ({ relative }) => {
  return (
    <Tooltip content={<RelativeTooltip relative={relative?.contact} />}>
      <Spacing m={{ l: "10px", b: "22px" }}>
        <Box d="flex" align="center" >
          <Avatar name={`${relative?.contact?.first_name} ${relative?.contact?.last_name}`}/>
          <Spacing m={{ l: "17px" }}>
            <StyledLabel>
              {relative?.contact?.relationship}
            </StyledLabel>
            <Text>{`${relative?.contact?.first_name || ""} ${
              relative?.contact?.last_name || ""
            }`}</Text>
          </Spacing>
        </Box>
      </Spacing>
    </Tooltip>
  );
};

const StyledLabel = styled(Label)`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #6b778c;
`;

const Text = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  min-width: 119px;
  color: #172b4d;
`;
