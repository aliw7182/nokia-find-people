import ReactAvatar from "react-avatar";
import Tooltip from "@atlaskit/tooltip";
import { templateReducer } from "../../../reducers/template/templateReducer";

export const Avatar = ({
  name,
  size = "large",
  ratio = 2.5,
  isChild = false,
}) => {
  return (
    <Tooltip content={name}>
      <ReactAvatar
        name={name}
        color={isChild ? "#8F62AD" : "#c1c7d0"}
        fgColor="#FFFFFF"
        round
        size={calculate_size(size)}
        textSizeRatio={ratio}
        textMarginRatio={0.17}
      />
    </Tooltip>
  );
};

const calculate_size = (size_name) => {
  switch (size_name) {
    case "xsmall":
      return "16px";
    case "small":
      return "24px";
    case "medium":
      return "32px";
    case "large":
      return "40px";
    case "slarge":
      return "50px";
    case "xlarge":
      return "96px";
    case "xxlarge":
      return "128px";
    default:
      return "32px";
  }
};
