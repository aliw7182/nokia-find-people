import Button from "@atlaskit/button";
import EmojiAddIcon from "@atlaskit/icon/glyph/emoji-add";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import {
  createChildUserRequest,
  updateChildUserRequest,
} from "../api/children";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { searchVectorTableData } from "../content/searchVector.data";
import { searchVectorsTableColumns } from "../content/columns.data";
import { getLocalStorageUser } from "../context/auth/authProvider";
import {
  fetchSearchVectors,
  createSearchVector,
  deleteSearchVector,
  updateSearchVector,
} from "../context/searchVectors/SearchVectorsProvider";
import { updateQueryParams } from "./OrganizationsPage";
import { AddSearchVectorForm } from "../components/SearchVector/";
import { ModalDialog } from "../components/ui/common";
import ChildIssuesIcon from "@atlaskit/icon/glyph/child-issues";
import {
  searchVectorReducer,
  initialState,
  fetchSearchVectorsSuccess,
  fetchSearchVectorsFailure,
  fetchSearchVectorsRequest,
} from "../reducers/searchVector";
import { toast } from "react-toastify";

export const SearchVectorsPage = (props) => {
  const history = useHistory();
  const query = new URLSearchParams(props.location.search);
  const head = searchVectorsTableColumns;
  const [currentPage, setCurrentPage] = useState(query.get("page") || 1);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState(query.get("search") || "");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(searchVectorReducer, initialState);
  const [currentSearchVector, setCurrentSearchVector] = useState(null);

  useEffect(() => {
    history.push(updateQueryParams(currentPage, search));
    const timer = setTimeout(() => fetch(), search?.length === 0 ? 0 : 1000);
    return () => clearTimeout(timer);
  }, [currentPage, search]);

  useEffect(() => {
    search.length > 0 && setCurrentPage(1);
  }, [search]);

  const fetch = () => {
    dispatch(fetchSearchVectorsRequest());
    fetchSearchVectors({
      page: currentPage,
      meta: true,
      search: search,
    })
      .then((response) => {
        if (response && response.meta && response.data) {
          dispatch(
            fetchSearchVectorsSuccess(
              searchVectorTableData(
                response.data,
                setIsOpen,
                setCurrentSearchVector,
                setIsAddModalOpen
              )
            )
          );
          setTotalPage(response.meta.num_pages);
        }
      })
      .catch((e) => e && dispatch(fetchSearchVectorsFailure(e.message)));
  };

  const onDelete = (id) => {
    deleteSearchVector({ id })
      .then(() => {
        fetch();
        toast.success("Search Vector is deleted successfully!");
      })
      .catch(() =>
        toast.error("Couldn't delete. Something went wrong. Try again!")
      )
      .finally(() => setIsOpen(false));
  };

  const onEdit = (data) => {
    dispatch(fetchSearchVectorsRequest());
    updateSearchVector(currentSearchVector.id, data)
      .then(() => {
        fetch();
        toast.success("Search Vector was successfully updated!");
      })
      .catch((e) => {
        dispatch(fetchSearchVectorsFailure(e?.message));
        toast.error("Couldn't update. Something went wrong. Try again!");
      })
      .finally(() => setIsAddModalOpen(false));
  };

  const onCreate = (data) => {
    dispatch(fetchSearchVectorsRequest());
    createSearchVector(data)
      .then(() => {
        fetch();
        toast.success("Search Vector was successfully created!");
      })
      .catch((e) => {
        dispatch(fetchSearchVectorsFailure(e?.message));
        toast.error("Couldn't create. Something went wrong. Try again!");
      })
      .finally(() => setIsAddModalOpen(false));
  };

  return (
    <>
      <Title>Search Vectors</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            iconBefore={<ChildIssuesIcon />}
            appearance="primary"
            onClick={() => {
              setCurrentSearchVector(null);
              setIsAddModalOpen(true);
            }}
          >
            Add Search Vector
          </Button>
        </Box>
      </Spacing>
      <ModalDialog
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        heading={
          currentSearchVector ? "Edit Search Vector" : "Add Search Vector"
        }
        appearance={null}
        body={
          <AddSearchVectorForm
            onSubmit={currentSearchVector ? onEdit : onCreate}
            onCancel={() => setIsAddModalOpen(false)}
            currentSearchVector={currentSearchVector}
            pending={state.loading}
          />
        }
        hasActions={false}
      />
      <Spacing m={{ t: "20px" }}>
        <Table
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={state.searchVectors}
          pending={state.loading}
          head={head}
        />
      </Spacing>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => onDelete(currentSearchVector.id)}
        positiveLabel="Delete"
        heading="Are you sure you want to remove this search vector?"
        body="You will no longer have access to this search vector"
        appearance="danger"
      />
    </>
  );
};
