import Button from "@atlaskit/button";
import { useState } from "react";
import styled from "styled-components"
import { Label, Spacing } from "../ui/atoms";
import {
  uploadRequest
} from "../../api/cloudinary";

export const SelectOrganizationLogo = ({ onClick, control, register, setLogoUrl, setPending }) => {
  const [logo, setLogo] = useState();
  const handleChange = (target) => {
    setPending(true);
    uploadRequest(target.files[0])
      .then( payload => setLogoUrl(payload.secure_url))   // console.log(payload)
      .catch(err => console.log(err))
      .finally(() => setPending(false));
    setLogo(URL.createObjectURL(target.files[0]));
  }
  return (
    <Container>
      <Label style={{ display: "block" }}>Logo</Label>
      {logo && (
        <Spacing m={{ t: "8px", b: "12px" }}>
          <LogoPreview style={{ display: "block" }} src={logo} alt="logo" />
        </Spacing>
      )}
      <Button onClick={onClick}>
        <ButtonContentWrapper>Upload Logo</ButtonContentWrapper>
        <InvisibleFileInput
          type="file"
          name="logo"
          onChange={ ({ target }) => handleChange(target)}
          accept="image/*"
          control={control}
          ref={register}
          style={{
            opacity: 0,
            width: 100,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Button>
    </Container>
  );
};

const LogoPreview = styled.img`
  max-height: 200px;
  max-width: 200px;
`;

const Container = styled.div`
  margin-top: 18px;
`;

const ButtonContentWrapper = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;

export const InvisibleFileInput = styled.input`
  opacity: 0;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
`;
