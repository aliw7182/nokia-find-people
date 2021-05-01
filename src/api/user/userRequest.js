import { request } from "../../utils/request";

export const fetchUsersRequest = async (params = null) => {
  const { view = "", page = "", search = "", meta = false } = params || {};
  return request({
    endpoint:
      "admin/users" +
      (params?.id ? "/" + params?.id : "") +
      `?view=${view}&page=${page}&search=${search}`,
    method: "GET",
    meta: meta,
  });
};

export const fetchUsersMeta = async () => {
  return request({
    endpoint: "admin/users",
    method: "GET",
    meta: true,
  });
};

export const deleteUsersRequest = async (userId) => {
  return request({
    endpoint: `admin/users/${userId}`,
    method: "DELETE",
  });
};

export const deleteOrganizationUserRequest = async (id) => {
  return request({
    endpoint: `user_organizations/${id}`,
    method: "DELETE",
  });
};

export const updateUserRequest = (id, data) => {
  return request({
    endpoint: `admin/users/${id}`,
    method: "PUT",
    data
  });
}
