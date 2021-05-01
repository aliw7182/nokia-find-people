import ChildIssuesIcon from "@atlaskit/icon/glyph/child-issues";
import EmojiSymbolsIcon from "@atlaskit/icon/glyph/emoji/symbols";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import People from "@atlaskit/icon/glyph/people";
import QueuesIcon from "@atlaskit/icon/glyph/queues";
import Screen from "@atlaskit/icon/glyph/screen";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import Signout from "@atlaskit/icon/glyph/sign-out";
import SuitcaseIcon from "@atlaskit/icon/glyph/suitcase";
import Select from "@atlaskit/select";
import React, { memo } from "react";
import { Link, useHistory } from "react-router-dom";
import { ACTIONS } from "../../../accessControl/actions";
import Can from "../../../accessControl/Can";
import { updateUserRequest } from "../../../api/user/userRequest";
import { useAuth } from "../../../context/auth/authContext";
import {
  ACTION_ITEMS,
  CHILDREN,
  COMMUNICATION_TEMPLATES,
  ORGANIZATIONS,
  REPORTS,
  SEARCHVECTOR,
  SETTINGS,
  USERS,
  RESOURCES,
} from "../../../helpers";
import { Box, Logo, SidebarMenuItem, Spacing } from "../atoms";
import { SidebarUser } from "./SidebarUser";
import logo from "../../../assets/logo.png"
const SIDEBAR_ITEMS = (isSuperAdmin = false) => [
  {
    to: "/",
    title: "Organizations",
    icon: () => <OfficeBuilding />,
    exact: "super_admin",
    perform: `${ORGANIZATIONS}:${ACTIONS.VISIT}`,
  },


  {
    to: "/children",
    title: "Children",
    icon: () => <EmojiSymbolsIcon />,
    atLeast: "user",
    perform: `${CHILDREN}:${ACTIONS.VISIT}`,
  },
  
  {
    to: "/users",
    title: isSuperAdmin ? "Users" : "Organization users",
    icon: () => <People />,
    exact: "super_admin",
    perform: `${USERS}:${ACTIONS.VISIT}`,
  },
  {
    to: "/settings",
    title: "Settings",
    icon: () => <SettingsIcon />,
    atLeast: "user",
    perform: `${SETTINGS}:${ACTIONS.VISIT}`,
  },
 
 
];

const SidebarInner = () => {
  const { logout, user, fetchMe } = useAuth();
  const history = useHistory();
  const setCurrentOrganization = async (data) => {
    console.log(data);
    localStorage.setItem("organizationName", data?.organization?.name);
    await updateUserRequest(user.id, {
      user: {
        organization_id: data.organization_id,
        role: data.role,
      },
    });
    await fetchMe();
    history.push("/");
  };

  return (
    <Box
      d="flex"
      direction="column"
      justify="space-between"
      align="space-between"
      h="100%"
    >
      <Box>
        <Box d="flex" align="center" justify="center" h="90px">
          <Logo link = {logo}/>
        </Box>
        <Spacing m={{ l: "15px", b: "15px", t: "15px" }}>
          {/* <Select
            onChange={({ value }) =>
              value.organization_id !== user.organization_id &&
              setCurrentOrganization(value)
            }
            value={user?.selectedOrganization}
            className="single-select"
            classNamePrefix="react-select"
            options={user?.user_organizations?.map((userOrganizations) => ({
              value: userOrganizations,
              label: userOrganizations?.organization?.name,
            }))}
          /> */}
        </Spacing>

        {SIDEBAR_ITEMS(user?.role === "super_admin").map((item) => (
          <Can
            perform={item.perform}
            yes={() => (
              <SidebarMenuItem key={item.to}>
                <Link to={item.to}>
                  {item.icon()}
                  <Spacing m={{ l: "15px" }}>{item.title}</Spacing>
                </Link>
              </SidebarMenuItem>
            )}
          />
        ))}
        <SidebarMenuItem>
          <Link
            onClick={() => {
              logout();
            }}
          >
            <Signout />
            <Spacing m={{ l: "15px" }}>Log Out</Spacing>
          </Link>
        </SidebarMenuItem>
      </Box>
      <SidebarUser />
    </Box>
  );
};

export const Sidebar = memo(SidebarInner);
