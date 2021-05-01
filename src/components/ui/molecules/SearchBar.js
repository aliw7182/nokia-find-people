import SearchIcon from "@atlaskit/icon/glyph/search";
import Textfield from "@atlaskit/textfield";
import styled from "styled-components";

export const SearchBar = ({ onChange, value }) => {
  return (
    <SearchBarContainer>
      <SearchInput
        value={value}
        onChange={onChange}
        placeholder="Search"
        elemBeforeInput={
          <IconContainer>
            <SearchIcon primaryColor="#6B778C" />
          </IconContainer>
        }
      />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  width: 240px;
  height: 34px;
`;

const IconContainer = styled.div`
  margin-left: 10px;
  display: flex;
`;

const SearchInput = styled(Textfield)`
  background: #ffffff;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 5px;
`;
