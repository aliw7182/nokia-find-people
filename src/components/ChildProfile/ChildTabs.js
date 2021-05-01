import Tabs from "@atlaskit/tabs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { CommentsTab } from "./tabs/Comments/CommentsTab";
import { Connections } from "./tabs/Connections";
import { FamilySearchTab } from "./tabs/FamilySearch/FamilySearchTab";
import { LinkScoreTab } from "./tabs/LinkScore/LinkScoreTab";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";

export const ChildTabs = ({ currentCommentId }) => {
  const tabs = [
    {
      label: "Connections",
      content: <Connections />,
    },
    {
      label: "Family Tree",
      content: <FamilyTreePage />,
    },
    {
      label: "Link Alerts",
      content: <FamilySearchTab />,
    },
    {
      label: "Comments",
      content: <CommentsTab currentCommentId={currentCommentId} />,
    },
    {
      label: "Attachments",
      content: <AttachmentsPage />,
    },
  ];
  const location = useLocation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (currentCommentId) {
      setCurrent(3);
    }
  }, [currentCommentId]);

  useEffect(() => {
    if (location.hash.length > 0) {
      let label = location.hash.substr(1);
      let index = tabs
        .map((tab) => tab.label.replace(/\s+/g, "-").toLowerCase())
        .indexOf(label);
      if (index > -1) setCurrent(index);
    }
  }, [location.hash.length]);

  const selectTab = (tab, index) => {
    setCurrent(index);
  };

  return <Tabs onSelect={selectTab} selected={tabs[current]} tabs={tabs} />;
};
