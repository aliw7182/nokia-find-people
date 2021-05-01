import styled from "styled-components";

export const ComponentWrapper = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  display: block;
  width: 100%;
  min-height: 100vh;
  padding: 28px 40px;
`;