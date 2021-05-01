import { request } from "../../utils/request";

export const fetchOrganizationsRequest = async (params) => {
  const { view = "", page = "", search = "", meta = false } = params;
  return request({
    endpoint:
      "super_admin/organizations" +
      (params.id ? "/" + params.id : "") +
      `?view=${view}&page=${page}&search=${search}`,
    method: "GET",
    meta: meta,
  });
};

export const fetchOrganizationsMeta = async () => {
  return request({
    endpoint: "super_admin/organizations",
    method: "GET",
    meta: true,
  });
};

export const createOrganizationRequest = async (organization) => {
  console.log("body", organization);
  const organizationBody = {
    name: organization.name,
    address: organization.address,
    phone: organization.phone,
    logo: organization.logo,
    website: organization.website,
    city: organization?.city,
    zip: organization?.zip,
    state: organization?.state?.value,
  };
  return request({
    endpoint: "super_admin/organizations",
    data: { organization: organizationBody },
    method: "POST",
  });
};
