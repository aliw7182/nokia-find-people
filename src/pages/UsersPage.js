import Button from "@atlaskit/button";
import PersonIcon from "@atlaskit/icon/glyph/person";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import Can from "../accessControl/Can";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { UserBreadcrumbs } from "../components/Users/UserBreadcrumbs";
import { usersTableColumns } from "../content/columns.data";
import { userTableData } from "../content/user.data";
import { getLocalStorageUser, reset } from "../context/auth/authProvider";
import { deleteUser, fetchUsers } from "../context/user/userProvider";
import { USERS } from "../helpers/routes";
import { ACTIONS } from "../accessControl/actions";
import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, userReducer, initialState } from "../reducers/user";

const AllUsers = ({ history, search, setSearch }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <Box d="flex" align="flex-end">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Can
          perform={`${USERS}:${ACTIONS.ADD}`}
          yes={() => (
            <Button
              appearance="primary"
              iconBefore={<PersonIcon />}
              onClick={() => history.push("/users-add")}
            >
              Add User
            </Button>
          )}
        />
      </Box>
    </Spacing>
  </>
);

const ConcreteUser = ({ state }) => {
  const history = useHistory();
  const [ pending, setPending ] = useState(false);
  const name = state.users[0]?.cells[0].content
  const email = state.users[0]?.cells[1].content

  return (
    <>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between" align-items="flex-start">
          <UserBreadcrumbs text={name || ""} />
          <Button
            isDisabled={pending}
            appearance="danger"
            onClick={() => {
              setPending(true);
              reset({ email })
                .then(() => history.push(`/${USERS}`))
                .finally(() => setPending(false));
            }}
          >
            Reset password
          </Button>
        </Box>
      </Spacing>
    </>
  );
};
export const UsersPage = (props) => {
  const query = new URLSearchParams(props.location.search);
  const user = getLocalStorageUser();
  const head = usersTableColumns(user?.role);
  const id = props.match.params.id;
  const history = useHistory();
  
  const [ currentUser, setCurrentUser ] = useState(-1);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ totalPage, setTotalPage ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(query.get("page") || 1);
  const [ search, setSearch ] = useState(query.get("search") || "");
  //const [ state, dispatch ] = useReducer(userReducer, initialState)
  const [ state, dispatch ] = useReducer(userReducer, initialState)

  const onDelete = (id) => {
    deleteUser(id).finally(() => {
      setIsOpen(false);
      fetchUsersFunc();
    });
  };

  useEffect(() => {
    dispatch(fetchUsersRequest())
    const timer = setTimeout(fetchUsersFunc, search.length === 0 ? 0 : 1000);
    return () => clearTimeout(timer);
  }, [id, currentPage, search]);

  const fetchUsersFunc = () => {
    fetchUsers({
      id: id,
      view: "table",
      search: search,
      page: currentPage,
      meta: true,
    }).then(response => {
      if (response) {
        let payload = []
        if (id) {
          payload = userTableData(response.data, user, setIsOpen, setCurrentUser)
        } else {
          setTotalPage(response.meta.num_pages);
          payload = userTableData(response.data, user, setIsOpen, setCurrentUser, history)
        }
        dispatch(fetchUsersSuccess(payload))
      }
    }).catch(e => dispatch(fetchUsersFailure(e.message)))
  }

  return (
    <>
      <Title>{user?.role !== "super_admin" && user.organization?.name} Users</Title>
      {id ? (
        <ConcreteUser state={state}/>
      ) : (
        <AllUsers history={history} search={search} setSearch={setSearch} />
      )}
      <Spacing m={{ t: "23px" }}>
        <Table
          totalPage={!id && totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={state.users}
          pending={state.loading}
          head={head}
        />
      </Spacing>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => onDelete(currentUser)}
        positiveLabel="Delete"
        heading="Are you sure you want to remove this user?"
        body="This user will no longer have access to your organization"
        appearance="danger"
      />
    </>
  );
};
