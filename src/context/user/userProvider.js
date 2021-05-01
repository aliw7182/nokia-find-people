import { toast } from "react-toastify";
import {
  deleteOrganizationUserRequest,
  deleteUsersRequest,
  fetchUsersRequest,
} from "../../api/user";
import { localStorageKey } from "../../utils/requestHandler";

const getToken = async () => {
  return window.localStorage.getItem(localStorageKey);
};

const fetchUsers = (params) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return fetchUsersRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

const deleteOrganizationUser = (id) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return deleteOrganizationUserRequest(id).catch((err) => {});
};

const deleteUser = (userId) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return deleteUsersRequest(userId).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

export { fetchUsers, deleteUser, deleteOrganizationUser };
