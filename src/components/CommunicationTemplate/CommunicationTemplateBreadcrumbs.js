import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import PeopleIcon from "@atlaskit/icon/glyph/people";
import React from "react";
import { useHistory } from "react-router-dom";
import { Spacing } from "../../components/ui/atoms";

export const CommunicationTemplatesBreadcrumbs = ({ text = "Add Communication Template" }) => {
  const history = useHistory();
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbsItem
          iconBefore={
            <Spacing m={{ r: "7px" }}>
              <PeopleIcon primaryColor="#2684FF" />
            </Spacing>
          }
          text="Communication Templates"
          onClick={() => history.push("../communications-templates")}
        />
        <BreadcrumbsItem text={text} />
      </Breadcrumbs>
    </>
  );
};
