import React from "react";
import {} from "../components/ui/molecules";
import Cover from "./../assets/Cover.svg";
import frame from "./../assets/Frame.svg";
import logo from "./../assets/app_logo.jpg";
import loginImage from "./../assets/loginImage.jpg";
import app_logo from "./../assets/app_logo.jpg";
import styled from "styled-components";

function LoginContainer({ children }) {
  return (
    <Container>
      <Image>
        <Overlay />
        <h1>LinkingLives</h1>
        <p></p>
      </Image>
      <Form>
        <Logo src={app_logo} />
        {children}
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 380px;
  width: 100%;
  height: 100vh;
  h1 {
    padding-right: 100px;
    padding-top: 100px;
    padding-left: 100px;
    z-index: 222;
    position: relative;
    color: white;
    font-size: 50px;
    font-weight: bolder;
  }
  p {
    padding-right: 100px;
    padding-left: 100px;
    z-index: 222;
    position: relative;
    color: white;
  }
  @media only screen and (max-width: 700px) {
    grid-template-columns: 0 1fr;
    height: 100%;
  }
`;
const Image = styled.div`
  background-image: url(${loginImage});
  background-size: cover;
  background-position-x: 50%;
  position: relative;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const Form = styled.div`
  justify-self: center;
  align-self: center;
  @media only screen and (max-width: 700px) {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(138, 43, 226, 0.35);
`;

const Logo = styled.img`
  max-width: 230px;
  margin-bottom: -80px;
  margin-top: -50px;
`;

export default LoginContainer;
