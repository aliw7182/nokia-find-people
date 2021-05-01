import React, { memo } from "react";
import styled from "styled-components";
import { parents } from "../../content/relationshipOptions.data";
import { Rectangle, Spacing, Title } from "../ui/atoms";
import { RelativeItem } from "./RelativeItem";

export const RelativesList = memo(({ relatives }) => {
  const childParents = relatives.filter(
    ({ contact }) =>
      contact?.relationship && parents.includes(contact.relationship)
  );

  return (
    <Rectangle p="14px 26px 14px 26px">
      <Title size="14px">Parents / Guardians</Title>
      <Spacing m={{ t: "8px" }}>
        <RelativeListContainer>
          {childParents.map((relative) => (
            <RelativeItem relative={relative} />
          ))}
        </RelativeListContainer>
      </Spacing>
    </Rectangle>
  );
});

const RelativeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
