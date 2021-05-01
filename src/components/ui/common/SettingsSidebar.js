import OfficeBuilding from "@atlaskit/icon/glyph/comment";
import React, { memo } from "react";
import { Link, useHistory } from "react-router-dom";
import Can from "../../../accessControl/Can";
import { updateUserRequest } from "../../../api/user/userRequest";
import { useAuth } from "../../../context/auth/authContext";
import { Box, SidebarMenuItem, Spacing } from "../atoms";

const SIDEBAR_ITEMS = (isSuperAdmin = false) => [
  {
    to: "/settings/contacts",
    title: "Message send contacts",
    icon: () => <OfficeBuilding />,
    atLeast: "admin",
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
      </Box>
    </Box>
  );
};

export const SettingsSidebar = memo(SidebarInner);
