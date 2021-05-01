import Button from "@atlaskit/button";
import React from "react";
import styled from "styled-components";
import { Box, Label, Spacing } from "../ui/atoms";
import { Avatar } from "../ui/molecules/Avatar";
import { Rounded } from "../ui/molecules/Rounded";

export const SiblingsItem = ({
  sibling,
  onAdd,
  onDelete,
  visibleRemove = false,
}) => {
  return (
    <Spacing m={{ l: "10px", b: "22px" }}>
      <Box d="flex" align="center">
        <Rounded
          onClick={() => window.open(`${sibling?.id}`)}
          onDelete={onDelete}
          visibleRemove={visibleRemove}
          content={
            <>
              <Avatar
                size="small"
                name={`${sibling?.first_name} ${sibling?.last_name}`}
                isChild
              />
              <span style={{ marginLeft: "5px", color: "#455670" }}>
                {sibling?.first_name} {sibling?.last_name}
              </span>
              {onAdd ? (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd();
                  }}
                  appearance="primary"
                  style={{ borderRadius: 20, marginLeft: 10 }}
                >
                  +
                </Button>
              ) : null}
            </>
          }
        />
      </Box>
    </Spacing>
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
