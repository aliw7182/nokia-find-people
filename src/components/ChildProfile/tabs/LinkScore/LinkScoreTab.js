import { useContext } from "react";
import CheckIcon from "@atlaskit/icon/glyph/check";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import QuestionIcon from "@atlaskit/icon/glyph/question";
import { G300 } from "@atlaskit/theme/colors";
import { R400 } from "@atlaskit/theme/colors";
import { Title } from "../../../ui/atoms";
import { ConnectionContext } from "../Connections/ConnectionModal";

export const LinkScoreTab = () => {
  const { linkScore } = useContext(ConnectionContext);
  return (
    <div style={{ marginBottom: 350, marginTop: 30 }}>
      <Category name="Demographics" score={linkScore.demographics} />
      <Category name="Housing" score={linkScore.housing} />
      <Category name="Financial" score={linkScore.financial} />
      <Category name="Criminal History" score={linkScore.criminal_history} />
      <Category name="Transportation" score={linkScore.transportation} />
    </div>
  );
};

const Category = ({ name, score = null }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: 250,
        marginBottom: 20,
      }}
    >
      <Title size="16px">{name}</Title>
      {score != null && score > 0 && <CheckIcon primaryColor="green" />}
      {score != null && score <= 0 && <CrossIcon primaryColor={R400} />}
      {score == null && <QuestionIcon />}
    </div>
  );
};
