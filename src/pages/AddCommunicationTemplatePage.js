import React from "react";
import { createCommunicationTemplateRequest } from "../api/communicationTemplates";
import { CommunicationTemplateForm } from "../components/CommunicationTemplate";
import { CommunicationTemplatesBreadcrumbs } from "../components/CommunicationTemplate/CommunicationTemplateBreadcrumbs";
import { Spacing, Title } from "../components/ui/atoms";

export const AddCommunicationTemplatePage = () => {
  return (
    <>
      <Title>Communication Template</Title>
      <Spacing m={{ t: "28px" }}>
        <CommunicationTemplatesBreadcrumbs />
      </Spacing>
      <CommunicationTemplateForm onSubmit={createCommunicationTemplateRequest} />
    </>
  );
};
