import React from "react";
import styled from "styled-components";
import { Avatar } from "../ui/molecules/Avatar";

const Entry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    setSuggestions,
    ...parentProps
  } = props;

  // console.log(props);

  return (
    <StyledEntry
      {...parentProps} // this should be first prop
      isFocused={isFocused}
      onMouseDown={(e) => {
        props.onMouseDown(e);
        setSuggestions && setTimeout(() => setSuggestions(0), 500);
      }}
      onMouseUp={(e) => {
        props.onMouseUp(e);
        setSuggestions && setSuggestions(0);
      }}
    >
      <StyledEntryContainer>
        <StyledLeft>
          <StyledAvatar size="small" name={mention.name} />
        </StyledLeft>

        <StyledRight>
          <StyledText>{mention.name}</StyledText>

          <StyledTitle>{mention.title}</StyledTitle>
        </StyledRight>
      </StyledEntryContainer>
    </StyledEntry>
  );
};

const StyledEntry = styled.div`
  padding: 7px 10px 3px 10px;
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  background-color: ${(props) => (props.isFocused ? "#cce7ff" : "")};
`;
const StyledText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 80%;
  color: #a7a7a7;
`;
const StyledEntryContainer = styled.div`
  display: table;
  width: 100%;
`;
const StyledRight = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  padding-left: 8px;
`;
const StyledLeft = styled.div`
  display: table-cell;
  vertical-align: middle;
`;
const StyledAvatar = styled(Avatar)`
  display: block;
  width: 15px;
  height: 15px;
  // border-radius: 50%;
`;

export default Entry;
