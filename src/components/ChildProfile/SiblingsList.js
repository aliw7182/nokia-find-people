import React, { memo } from "react";
import styled from "styled-components";
import { Box, Spacing, Title } from "../ui/atoms";
import { SiblingsItem } from "./SiblingsItem";

export const SiblingsList = memo(
  ({ siblings, childId, onRemoveSiblingship }) => {
    return (
      <Spacing>
        <Title size="14px">Siblings</Title>
        <Spacing m={{ t: "8px" }}>
          <SiblingsListContainer>
            {siblings.map((siblings) => (
              <SiblingsItem
                visibleRemove={true}
                onDelete={() => onRemoveSiblingship(siblings.id)}
                sibling={
                  childId == siblings.sibling.id
                    ? siblings.child
                    : siblings.sibling
                }
              />
            ))}
            <Box d="flex" justify="center" align="center"></Box>
          </SiblingsListContainer>
        </Spacing>
      </Spacing>
    );
  }
);

const SiblingsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
