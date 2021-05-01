import StarIcon from "@atlaskit/icon/glyph/star";
import StarFilledIcon from "@atlaskit/icon/glyph/star-filled";
import React from "react";
import { Box } from "../atoms";

export const FitScore = ({ score }) => {
  return (
    <Box d="flex">
      {Array(5)
        .fill()
        .map((_, index) =>
          index <= score - 1 ? <StarFilledIcon /> : <StarIcon />
        )}
    </Box>
  );
};
