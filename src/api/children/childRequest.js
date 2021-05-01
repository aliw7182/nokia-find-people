import { request } from "../../utils/request";

export const fetchChildrenRequest = (params) => {
  const { view = "", page = "", search = "", meta = false } = params;
  return request({
    endpoint:
      "children" +
      (params.id ? `/${params.id}` : ``) +
      `?view=${view}&page=${page}&search=${search}`,
    method: "GET",
    meta: meta,
  });
};

export const fetchChildUsersRequest = (params) => {
  return request({
    endpoint: "children" + (params.id ? `/${params.id}` : ``) + `?view=users`,
    method: "GET",
  });
};

export const fetchConnectionsRequest = (params) => {
  return request({
    endpoint:
      "children" + (params.id ? `/${params.id}` : ``) + `?view=contacts`,
    method: "GET",
  });
};

export const fetchFamilyTreeRequest = (params) => {
  return request({
    endpoint:
      "children" + (params.id ? `/${params.id}` : ``) + `?view=family_tree`,
    method: "GET",
  });
};

export const fetchChildrenMeta = () => {
  return request({
    endpoint: "children",
    method: "GET",
    meta: true,
  });
};

export const fetchChildComments = (id) => {
  return request({
    endpoint: `children/${id}?view=comments`,
    method: "GET",
  });
};

export const fetchChildAttachmentsRequest = (id) => {
  return request({
    endpoint: `children/${id}?view=attachments`,
    method: "GET",
  });
};

export const createChildRequest = (data) => {
  return request({
    endpoint: "children",
    method: "POST",
    data,
  });
};

export const updateChildRequest = ({ id, ...rest }) => {
  return request({
    endpoint: `children/${id}`,
    method: "PUT",
    data: {
      child: {
        ...rest,
      },
    },
  });
};

export const createChildUserRequest = (data) => {
  return request({
    endpoint: "user_children",
    method: "POST",
    data,
  });
};

export const removeChildUserRequest = (id) => {
  return request({
    endpoint: `user_children/${id}`,
    method: "DELETE",
  });
};

export const updateChildUserRequest = (data) => {
  return request({
    endpoint: `user_children`,
    method: "PUT",
    data,
  });
};

export const approveChildUserRequest = (user_id, child_id) => {
  return request({
    endpoint: "user_children",
    method: "PUT",
    data: {
      user_child: {
        user_id: user_id,
        child_id: child_id,
        date_approved: new Date(),
      },
    },
  });
};

export const denyChildUserRequest = (user_id, child_id) => {
  return request({
    endpoint: "user_children",
    method: "PUT",
    data: {
      user_child: {
        user_id: user_id,
        child_id: child_id,
        date_denied: new Date(),
      },
    },
  });
};

export const fetchChildSiblings = (id) => {
  return request({
    endpoint: `siblingships/${id}?view=extended`,
    method: "GET",
  });
};

export const createChildSiblingsRequest = (data) => {
  return request({
    endpoint: `siblingships`,
    method: "POST",
    data,
  });
};

export const removeChildSiblingsRequest = (id) => {
  return request({
    endpoint: `siblingships/${id}`,
    method: "DELETE",
  });
};

export const fetchSchoolDistrictsRequest = () => {
  return request({
    endpoint: "school_districts",
    method: "GET",
  });
};
