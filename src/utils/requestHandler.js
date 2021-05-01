export const localStorageKey = "__auth_provider_token__";

export const handleUserResponse = (user) => {
  if (user?.token) {
    window.localStorage.setItem(localStorageKey, user.token);
  }
  if (user?.id) {
    window.localStorage.setItem("user", JSON.stringify(user));
  }

  return user;
};
