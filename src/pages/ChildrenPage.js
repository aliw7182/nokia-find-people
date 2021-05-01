import Button from "@atlaskit/button";
import EmojiAddIcon from "@atlaskit/icon/glyph/emoji-add";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import Can from "../accessControl/Can";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import {
  createChildUserRequest,
  updateChildUserRequest,
} from "../api/children";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { childTableData } from "../content/child.data";
import { childrenTableColumns } from "../content/columns.data";
import { getLocalStorageUser } from "../context/auth/authProvider";
import { fetchChildren } from "../context/children/childProvider";
import { CHILDREN } from "../helpers";
import { updateQueryParams } from "./OrganizationsPage";
import { ACTIONS as PERFORMS } from "../accessControl/actions";
import {
  childReducer,
  fetchChildrenFailure,
  fetchChildrenSuccess,
  initialState,
  fetchChildrenRequest,
} from "../reducers/child";
import { AvatarGroup } from "../components/ui/molecules/AvatarGroup";

export const ChildrenPage = (props) => {
  const query = new URLSearchParams(props.location.search);
  const user = getLocalStorageUser();
  const head = childrenTableColumns(user?.role === "user");
  const history = useHistory();

  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(query.get("page") || 1);
  const [search, setSearch] = useState(query.get("search") || "");
  const [state, dispatch] = useReducer(childReducer, initialState);

  useEffect(() => {
    history.push(updateQueryParams(currentPage, search));
    dispatch(fetchChildrenRequest());
    const timer = setTimeout(
      fetchChildrenFunc,
      search?.length === 0 ? 0 : 1000
    );
    return () => clearTimeout(timer);
  }, [currentPage, search]);

  useEffect(() => {
    search.length > 0 && setCurrentPage(1);
  }, [search]);

  const assignUser = async (child, isRepeatedly = false) => {
    if (user?.role === "user") {
      dispatch(fetchChildrenRequest());
      try {
        isRepeatedly
          ? await updateChildUserRequest({
              user_child: {
                user_id: user.id,
                child_id: child.id,
                date_denied: null,
              },
            })
          : await createChildUserRequest({
              user_child: {
                users: [
                  {
                    user_id: user.id,
                    child_id: child.id,
                  },
                ],
              },
            });
        await createActionItemRequest({
          action_item: {
            title: "Child Permission Request",
            description: `${user.first_name} ${user.last_name} has requested access for ${child.full_name}`,
            child_id: child.id,
            related_user_id: user.id,
            action_type: "access_request",
          },
        });
        fetchChildrenFunc();
      } catch (e) {
        dispatch(fetchChildrenFailure(e.message));
      }
    }
  };

  const fetchChildrenFunc = () => {
    fetchChildren({
      view: "table",
      page: currentPage,
      meta: true,
      search: search,
    })
      .then((response) => {
        if (response) {
          setTotalPage(response.meta.num_pages);
          dispatch(
            fetchChildrenSuccess(
              childTableData(
                response.data,
                history,
                assignUser,
                user.role === "user"
              )
            )
          );
        }
      })
      .catch((e) => dispatch(fetchChildrenFailure(e.message)));
  };

  return (
    <>
      <Title>Children</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Can
            perform={`${CHILDREN}:${PERFORMS.ADD}`}
            yes={() => (
              <Button
                iconBefore={<EmojiAddIcon />}
                appearance="warning"
                onClick={() => history.push("/children-add")}
              >
                Add Child
              </Button>
            )}
          />
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <Table
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={state.children}
          pending={state.loading}
          head={head}
        />
      </Spacing>
    </>
  );
};
