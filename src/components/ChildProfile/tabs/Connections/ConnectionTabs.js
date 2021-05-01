import Tabs from "@atlaskit/tabs";
import React, { useContext, useState } from "react";
import { AttachmentsTab } from "./AttachmentsTab";
import { CommentsTab } from "./CommentsTab";
import { ConnectionContext } from "./ConnectionModal";
import TemplatesSentTab from "./TemplatesSentTab";
import { AlertsTab } from "./AlertsTab";
import { LinkScoreTab } from "../LinkScore/LinkScoreTab";
import { ContactInfoTab } from "../ContactInfo/ContactInfoTab";

export const ConnectionTabs = (props) => {
  const currentTab = props.currentTab;

  const tabs = [
    {
      label: "Contact Info",
      content: <ContactInfoTab />,
    },
    {
      label: "Link Alerts",
      content: <AlertsTab />,
    },
    {
      label: "Link Score",
      content: <LinkScoreTab />,
    },
    {
      label: "Engagements",
      content: <TemplatesSentTab />,
    },
    {
      label: "Comments",
      content: <CommentsTab setCurrentCommentId={props.setCurrentCommentId} />,
    },
    {
      label: "Attachments",
      content: <AttachmentsTab connection={props.currentConnection} />,
    },
  ];

  const getCurrentTab = () => {
    switch (currentTab) {
      case "alerts":
        return 1;
      case "comments":
        return 2;
      case "attachments":
        return 3;
      default:
        return 0;
    }
  };

  const [current, setCurrent] = useState(getCurrentTab);

  const selectTab = (tab, index) => {
    setCurrent(index);
  };

  return <Tabs onSelect={selectTab} selected={tabs[current]} tabs={tabs} />;
};
