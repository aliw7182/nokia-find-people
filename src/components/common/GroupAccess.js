import { useAuth } from "../../context/auth/authContext";
import { getLocalStorageUser } from "../../context/auth/authProvider";

export const GroupAccess = ({ children, ...rest }) => {
  const localStorageUser = getLocalStorageUser();
  const { user } = useAuth();
  const currentUser = user || localStorageUser;
  const currentGroupId = currentUser ? groupIdFromUser(currentUser.role) : null;
  if (("atLeast" in rest, ableToPassAtLeast(rest.atLeast, currentGroupId))) {
    return children;
  }

  if ("exact" in rest && ableToPassExact(rest.exact, currentGroupId)) {
    return children;
  }

  return null;
};

export const GroupKeys = {
  0: "admin",
  1: "manager",
  2: "user",
  3: "super_admin",
};

export const groupIdFromUser = (role) => {
  const groupIndex = Object.values(GroupKeys).findIndex((key) => key === role);
  return Object.keys(GroupKeys)[groupIndex];
};

export function ableToPassAtLeast(atLeast, currentGroupId) {
  switch (atLeast) {
    case "super_admin":
    case "admin":
    case "manager":
    case "user":
      return !!currentGroupId && currentGroupId <= groupIdFromUser(atLeast);
    default:
      return false;
  }
}

export function ableToPassExact(exact, currentGroupId) {
  switch (exact) {
    case "super_admin":
    case "admin":
    case "manager":
    case "user":
      return !!currentGroupId && currentGroupId === groupIdFromUser(exact);
    default:
      return false;
  }
}
