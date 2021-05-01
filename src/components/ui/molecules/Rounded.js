import Button from "@atlaskit/button";
import { useState } from "react";
import styled from "styled-components";
import { ModalDialog } from "../common";

export const Rounded = ({
  content,
  onClick,
  isRemovable = false,
  visibleRemove = false,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container onClick={onClick} isRemovable={isRemovable}>
      {content}
      {visibleRemove && (
        <Button
          spacing="none"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          appearance="subtle"
          style={{ borderRadius: 20, marginLeft: 15, padding: "3px 9px" }}
        >
          ✕
        </Button>
      )}
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
          onDelete();
        }}
        positiveLabel="Delete"
        heading="Are you sure you want to remove ?"
        body="You will no longer see this sibling here"
        appearance="danger"
      />
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 30px;
  border: 1px solid #c1c7d0;
  transition: 0.2s;

  ${({ isRemovable }) =>
    !isRemovable &&
    `
      :hover {
        background: #f0f0f0;
        cursor: pointer;  
      }
    `}
`;
