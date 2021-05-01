import React from "react";
import { AddOrganizationForm, OrganizationBreadcrumbs } from "../components/Organizations";
import { Spacing, Title } from "../components/ui/atoms";
import { useOrganization } from "../context/organization/organizationContext";

export const AddOrganizationPage = () => {
  const { createOrganization } = useOrganization();
  return (
    <>
      <Title>Organizations</Title>
      <Spacing m={{ t: "28px" }}>
        <OrganizationBreadcrumbs text="Add organization" />
      </Spacing>
      <AddOrganizationForm onSubmit={createOrganization} />
    </>
  );
};

