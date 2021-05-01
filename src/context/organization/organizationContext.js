import React, { useState } from "react";
import * as organization from "./organizationProvider";

const OrganizationContext = React.createContext();

export const OrganizationProvider = (props) => {
  const [organizations, setOrganizations] = useState(null);

  const fetchOrganizations = React.useCallback(
    (form) => organization.fetchOrganizations(form).then(setOrganizations),
    []
  );

  const createOrganization = React.useCallback(
    (form) =>
      organization.createOrganization(form).then(() => fetchOrganizations),
    [fetchOrganizations]
  );

  const value = React.useMemo(
    () => ({
      organizations,
      fetchOrganizations,
      createOrganization,
    }),
    [organizations, fetchOrganizations, createOrganization]
  );

  return <OrganizationContext.Provider value={value} {...props} />;
};

export const useOrganization = () => {
  const context = React.useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      `useOrganizations must be used within a OrganizationProvider`
    );
  }
  return context;
};
