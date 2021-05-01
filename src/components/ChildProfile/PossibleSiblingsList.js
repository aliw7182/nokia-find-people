import React, { memo } from "react";
import styled from "styled-components";
import { Spacing, Title } from "../ui/atoms";
import { SiblingsItem } from "./SiblingsItem";

export const PossibleSiblingsList = memo(({ siblings, createSiblings }) => {
  return (
    <Spacing m="20px 0px 0px 0px">
      {siblings?.length ? <Title size="14px">Possible siblings</Title> : null}
      <Spacing m={{ t: "8px" }}>
        <SiblingsListContainer>
          {siblings.map((siblings) => (
            <SiblingsItem
              onAdd={() => createSiblings(siblings?.sibling.id)}
              sibling={siblings?.sibling}
            />
          ))}
        </SiblingsListContainer>
      </Spacing>
    </Spacing>
  );
});

const SiblingsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
