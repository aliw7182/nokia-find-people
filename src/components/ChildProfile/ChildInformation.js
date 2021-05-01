import Button from "@atlaskit/button";
import moment from "moment";
import React, { memo } from "react";
import styled from "styled-components";
import { humanReadableDateFormat } from "../../content/date";
import { Box, Label, Rectangle, Spacing, Title } from "../ui/atoms";
import { Avatar } from "../ui/molecules/Avatar";
import EditorEditIcon from "@atlaskit/icon/glyph/editor/edit";
import Can from "../../accessControl/Can";
import { CHILDREN } from "../../helpers";
import { ACTIONS } from "../../accessControl/actions";

export const ChildInformation = memo(({ child, setIsOpenEdit }) => {
  return (
    <Rectangle>
      <Box d="flex" mb="16px">
        <Avatar name={`${child.first_name} ${child.last_name}`} isChild />
        <Spacing m={{ l: "17px" }}>
          <StyledLabel>Full name</StyledLabel>
          <Box d="flex" align="center">
            <Title size="18px" style={{ marginRight: "5px" }}>
              {child.first_name ? `${child.first_name} ${child.last_name}` : ""}
            </Title>
            <Can
              perform={`${CHILDREN}:${ACTIONS.EDIT}`}
              yes={() => (
                <Button
                  spacing="none"
                  appearance="link"
                  onClick={() => setIsOpenEdit(true)}
                >
                  <EditorEditIcon size="medium" />
                </Button>
              )}
            />
          </Box>
        </Spacing>
      </Box>
      <Box d="flex" justify="space-between">
        <Spacing m={{ l: "8px", r: "8px" }}>
          <StyledLabel>Birth date</StyledLabel>
          <Text>{moment(child.birthday).format(humanReadableDateFormat)}</Text>
        </Spacing>
        <Spacing m={{ l: "8px", r: "8px" }}>
          <StyledLabel>Gender</StyledLabel>
          <Text>{child.gender}</Text>
        </Spacing>
        <Spacing m={{ l: "8px", r: "8px" }}>
          <StyledLabel>Race</StyledLabel>
          <Text>{child.race}</Text>
        </Spacing>
        <Spacing m={{ l: "8px", r: "8px" }}>
          <StyledLabel>Permanency goal</StyledLabel>
          <Text>{child.permanency_goal}</Text>
        </Spacing>
        <Spacing m={{ l: "8px", r: "8px" }}>
          <StyledLabel>System status</StyledLabel>
          <Text>{child.system_status}</Text>
        </Spacing>
        <Spacing m={{ l: "8px", r: "8px" }}>
          <StyledLabel>Connections</StyledLabel>
          <Text>1</Text>
        </Spacing>
      </Box>
    </Rectangle>
  );
});

export const StyledLabel = styled(Label)`
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
  color: #172b4d;
`;
