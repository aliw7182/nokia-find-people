import { toast } from "react-toastify";
import {
  createOrganizationRequest,
  fetchOrganizationsRequest,
} from "../../api/organization";

const fetchOrganizations = (params = null) => {
  const errorStatuses = {
    500: "Error on Server !",
  };
  return fetchOrganizationsRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

const createOrganization = (data) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return createOrganizationRequest(data).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

export { fetchOrganizations, createOrganization };
