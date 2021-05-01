import React, { useEffect, useState, useContext } from "react";
import { fetchUsersRequest } from "../../../../api/user";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { ChildContext } from "../../../../pages/ChildProfilePage";

export const CommentsContext = React.createContext();

export const CommentsProvider = (props) => {
  const localStorageUser = getLocalStorageUser();
  const [pending, setPending] = useState(false);
  const [mentions, setMentions] = useState();
  const { connectionState } = useContext(ChildContext);
  const [contacts, setContacts] = useState(
    connectionState.connections.map(
      (connection) =>
        connection &&
        connection.contact && {
          name: `${
            connection.contact?.first_name[0]?.toUpperCase() +
            connection.contact?.first_name?.substring(1)
          } ${
            connection.contact.last_name
              ? connection.contact?.last_name[0]?.toUpperCase() +
                connection.contact?.last_name?.substring(1)
              : ""
          }`,
          // title: "Staff of Penn State Orphanage",
          id: connection?.id,
        }
    )
  );

  useEffect(() => {
    fetchUsersRequest().then((response) => {
      console.log(response);
      setMentions(
        response.map((user) => ({
          name: `${
            user.first_name[0].toUpperCase() + user.first_name.substring(1)
          } ${user.last_name[0].toUpperCase() + user.last_name.substring(1)}`,
          // title: "Staff of Penn State Orphanage",
          id: user.id,
        }))
      );
    });
  }, []);

  const value = React.useMemo(
    () => ({
      mentions,
      contacts,
      pending,
      setPending,
    }),
    [mentions, contacts, pending, setPending]
  );

  return <CommentsContext.Provider value={value} {...props} />;
};

export const useMentions = () => {
  const context = React.useContext(CommentsContext);
  if (context === undefined) {
    return {
      mentions: [],
      contacts: [],
    };
  }
  return context;
};
