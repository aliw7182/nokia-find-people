import React from "react";
import { TooltipPrimitive } from "@atlaskit/tooltip";
import styled from "styled-components";
import { Box, Label, Rectangle, Spacing, Title } from "../../../ui/atoms";
import { FitScore } from "../../../ui/molecules";
import { Avatar } from "../../../ui/molecules/Avatar";
import { CustomTooltip } from "../../index";
import Button from "@atlaskit/button";
import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import CommentIcon from "@atlaskit/icon/glyph/comment";
import EmailIcon from "@atlaskit/icon/glyph/email";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
export const DisqualifyTooltip = ({ contact, reason }) => {
  return (
    <CustomTooltip>
      <Spacing m={{ t: "0px" }}>
        <Rectangle style={{ width: "410px", border: "1px solid #dfe1e6" }}>
          <Box d="flex">
            <Box d="flex" direction="column" align="center" mr="16px">
              <Avatar
                name={`${contact?.first_name} ${contact?.last_name}`}
                size="slarge"
              />
              <Spacing m={{ t: "20px" }}>
                <FitScore score={3} />
              </Spacing>
              <p>Link Score</p>
            </Box>
            <Box>
              <Title size="18px">{`${contact?.first_name} ${contact?.last_name}`}</Title>
              <span>{contact?.relationship}</span>
              <Box mt="12px">
                <Box d="f">
                  <b style={{ marginRight: "7px" }}>Email:</b>
                  {contact?.email}
                  {"    "} <b style={{ marginRight: "7px" }}>Phone:</b>
                  {contact?.phone}
                </Box>
              </Box>
              <Box d="f">
                <b style={{ marginRight: "5px" }}>Disqualify Reason:</b>
                {reason}
              </Box>
            </Box>
          </Box>
        </Rectangle>
      </Spacing>
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
