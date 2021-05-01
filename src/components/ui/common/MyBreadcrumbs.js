import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import { memo } from "react";
import { Spacing } from "../atoms";
import EmojiSymbolsIcon from "@atlaskit/icon/glyph/emoji/symbols";
import { useHistory } from "react-router-dom";

export const MyBreadcrumbs = memo(({text1, text2, path}) => {
  const history = useHistory();
  return (
    <Breadcrumbs>
      <BreadcrumbsItem
        iconBefore={
          <Spacing m={{ r: "7px" }}>
            <EmojiSymbolsIcon primaryColor="#2684FF" />
          </Spacing>
        }
        onClick={() => history.push(path)}
        text={text1}
      />
      <BreadcrumbsItem text={text2} />
    </Breadcrumbs>
  )
})