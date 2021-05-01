import React, { useRef } from "react";
import styled from "styled-components";
import { Box } from "../ui/atoms";
import MentionWysiwygEditor from "./MentionWysiwygEditor";
import { useClickOutside } from "./../../hooks";
export const WysiwygEditor = (props) => {
  const { onChange, upd, setBlocks, setSuggestions, defaultValue = "" } = props;
  const myRef = useRef(null);
  useClickOutside([myRef], true, () => {
    setSuggestions && setSuggestions(0);
  });
  return (
    <StyledBox w="100%" ref={myRef}>
      <MentionWysiwygEditor
        setBlocks={setBlocks}
        upd={upd}
        defaultValue={defaultValue}
        onChange={onChange}
        setSuggestions={setSuggestions}
        {...props}
      />
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  margin: 10px 0;
  border: 1px solid rgb(215, 215, 215);
  .rdw-editor-main {
    padding: 0 20px 10px;
  }
`;
