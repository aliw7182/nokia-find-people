import React from "react";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import PeopleIcon from "@atlaskit/icon/glyph/people";
import { Spacing } from "../../components/ui/atoms";
import { useHistory } from "react-router-dom";

export const UserBreadcrumbs = ({ text = "Add User" }) => {
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
          text="Users"
          onClick={() => history.push("../users")}
        />
        <BreadcrumbsItem text={text} />
      </Breadcrumbs>
    </>
  );
};
