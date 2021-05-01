import { toast } from "react-toastify";
import {
  fetchMeAsAdminRequest,
  fetchMeRequest,
  loginRequest,
  newPasswordRequest,
  resetRequest,
  signupRequest,
} from "../../api/auth";
import {
  handleUserResponse,
  localStorageKey,
} from "../../utils/requestHandler";

const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

const login = ({ email, password }) => {
  const errorStatuses = {
    500: "Server error!",
    401: "Incorrect email or password!",
  };

  return loginRequest({ email, password })
    .then(handleUserResponse)
    .catch((err) =>
      toast.error(errorStatuses[err.status] || "Uncaught error !")
    );
};

const reset = (data) => {
  const errorStatuses = {
    500: "Error on Server !",
    404: "Incorrect Password!",
  };

  return resetRequest(data)
    .then(() => toast.success("Check your inbox to reset your password!"))
    .catch((err) => toast.error(errorStatuses[err.status]));
};

const newPassword = (data) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return newPasswordRequest(data)
    .then(() => toast.success("Your password has been successfully updated!"))
    .catch((err) => toast.error(errorStatuses[err.status]));
};

const signup = (user) => {
  const errorStatuses = {
    500: "Error on Server !",
    422: "User already exists !",
  };

  return signupRequest(user)
    .then(() => toast.success("User successfully created!"))
    .catch((err) => toast.error(errorStatuses[err.status]));
};

const fetchMe = () => {
  return fetchMeRequest("extended")
    .then(handleUserResponse)
    .catch((e) => console.log("ERROR", e));
};

const fetchMeAsAdmin = (adminId) => {
  return fetchMeAsAdminRequest(adminId).then(handleUserResponse).catch(logout);
};

const logout = async () => {
  await window.localStorage.removeItem(localStorageKey);
  await window.localStorage.removeItem("user");
};

const getLocalStorageUser = () => {
  return JSON.parse(window.localStorage.getItem("user"));
};

export {
  getToken,
  login,
  signup,
  logout,
  reset,
  newPassword,
  fetchMe,
  fetchMeAsAdmin,
  getLocalStorageUser,
};
