import React, { useEffect, useState } from "react";
import * as auth from "./authProvider";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setSignedIn] = useState(true);

  useEffect(() => {
    isAuthorized();
  }, []);

  useEffect(() => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(true);
    }
  }, [user]);

  const fetchMe = React.useCallback(
    () =>
      auth.fetchMe().then((user) => {
        if (user) {
          var selectedOrganization = null;
          user.user_organizations.map((item) => {
            if (
              item.organization_id === user.organization_id &&
              item.role === user.role
            ) {
              selectedOrganization = {
                value: item,
                label: item.organization.name,
              };
            }
          });
          setUser({
            ...user,
            selectedOrganization: selectedOrganization,
          });
        }
      }),
    []
  );

  useEffect(() => {
    if (isSignedIn) fetchMe();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isAuthorized = () => {
    const token = auth.getToken();
    console.log("TOKEN", token);
    if (token) {
      setSignedIn(true);
      return true;
    } else {
      // setSignedIn(false);
      // return false;
      return true;
    }
  };

  const login = React.useCallback(
    (form) =>
      auth.login(form).then((user) => {
        user?.email && setUser(user);
      }),
    []
  );

  const sign = React.useCallback((form) => auth.signup(form), []);

  const reset = React.useCallback((form) => auth.reset(form).then(setUser), []);

  const newPassword = React.useCallback((form) => {
    console.log(form);
    return auth.newPassword(form).then(setUser);
  }, []);

  const logout = React.useCallback(() => {
    auth.logout();
    setUser(null);
    setSignedIn(true);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isSignedIn,
      isAuthorized,
      login,
      logout,
      sign,
      reset,
      newPassword,
      fetchMe,
      setUser,
    }),
    [
      user,
      isSignedIn,
      isAuthorized,
      login,
      logout,
      sign,
      reset,
      newPassword,
      fetchMe,
      setUser,
    ]
  );

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};
