import { TooltipPrimitive } from "@atlaskit/tooltip";
import React from "react";
import styled from "styled-components";
import { Box, Label, Rectangle, Spacing, Title } from "../ui/atoms";
import { Avatar } from "../ui/molecules/Avatar";

export const RelativeTooltip = ({ relative }) => {
  return (
    <CustomTooltip>
      <Rectangle>
        <Box d="flex" align="flex-start">
          <Avatar name="Bekzat Makhanbet" size="large" />
          <Spacing m={{ l: "17px" }}>
            <StyledLabel>{relative?.relationship}</StyledLabel>
            <Title>
              {relative?.first_name} {relative?.last_name}
            </Title>
            <Text>{relative?.phone}</Text>
            <Text>{relative?.email}</Text>
            <Spacing m={{ t: "16px" }}>
              <Text>{relative?.address}</Text>
            </Spacing>
          </Spacing>
        </Box>
      </Rectangle>
    </CustomTooltip>
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

export const CustomTooltip = styled(TooltipPrimitive)`
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-sizing: content-box;
  color: #333;
  width: 405px;
  margin-left: -10px;
  margin-top: -5px;
  margin-bottom: -5px;
  height: 105%;
`;
