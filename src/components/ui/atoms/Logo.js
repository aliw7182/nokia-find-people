import React, { memo } from "react";
import ImagePlacholder from "../../../assets/image_placeholder.svg";

const InnerLogo = ({ link }) => {
  return (
    <img
      style={{
        height: "80px"
      }}
      alt="Logo"
      src={link || ImagePlacholder}
    />
  );
};

export const Logo = memo(InnerLogo)
