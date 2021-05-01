import React from "react";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import { Spacing } from "../../components/ui/atoms";
import { useHistory } from "react-router-dom";

export const OrganizationBreadcrumbs = ({ text }) => {
  const history = useHistory();
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbsItem
          iconBefore={
            <Spacing m={{ r: "7px" }}>
              <OfficeBuilding primaryColor="#2684FF" />
            </Spacing>
          }
          text="Organizations"
          onClick={() => history.push("../organizations")}
        />
        <BreadcrumbsItem text={text} />
      </Breadcrumbs>
    </>
  );
};
