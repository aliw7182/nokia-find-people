import { request } from "../../utils/request";

export const loginRequest = async ({ email, password }) => {
  return request({
    endpoint: "auth/login",
    data: { user: { email, password } },
    method: "POST",
  });
};

export const signupRequest = async (user) => {
  console.log("body", user);
  const userBody = {
    email: user.email,
    phone: user.phone,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    organization_id: user.organization_id,
  };
  return request({
    endpoint: "auth/signup",
    data: { user: userBody, organizations: user.organizations },
    method: "POST",
  });
};

export const fetchMeRequest = (view = "") => {
  return request({
    endpoint: "users/me?view=" + view,
    method: "GET",
  });
};

export const fetchMeAsAdminRequest = async (adminId) =>
  request({
    endpoint: `super_admin/admins/${adminId}`,
    method: "GET",
  });

export const resetRequest = async (data) => {
  return request({
    endpoint: "auth/forgot_password",
    data: { email: data.email },
    method: "POST",
  });
};

export const newPasswordRequest = async (data) => {
  return request({
    endpoint: "auth/reset_password",
    data: {
      change_password_token: data.token,
      password: data.password,
    },
    method: "POST",
  });
};
