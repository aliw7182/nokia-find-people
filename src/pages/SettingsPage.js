import React from "react";
import { Box, Spacing, Title } from "../components/ui/atoms";
import ContactsSettingPage from "./ContactsSettingPage";

export const SettingsPage = () => {
  return (
    <>
      <Title>Settings</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <ContactsSettingPage />
          {/* <SettingsSidebar /> */}
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}></Spacing>
    </>
  );
};
