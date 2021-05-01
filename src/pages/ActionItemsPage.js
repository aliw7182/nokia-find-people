import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { Spacing, Title } from "../components/ui/atoms";
import { Table } from "../components/ui/common/Table";
import { actionItemTableData } from "../content/actionItem.data";
import { actionItemsTableColumns } from "../content/columns.data";
import { fetchActionItems } from "../context/actionItems/actionItemProvider";
import { actionItemReducer, fetchActionItemsFailure, fetchActionItemsSuccess, initialState } from "../reducers/actionItem";


export const ActionItemsPage = (props) => {
  const query = new URLSearchParams(props.location.search);
  const history = useHistory();
  
  const [ tablePending, setTablePending ] = useState(true);
  const [ totalPage, setTotalPage ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(query.get("page") || 1);
  const [ state, dispatch ] = useReducer(actionItemReducer, initialState)

  useEffect(() => {
    history.push(`?page=${currentPage}`);
    fetchActionItemsFunc();
  }, [currentPage]);

  const fetchActionItemsFunc = () => {
    fetchActionItems({
      page: currentPage, 
      meta: true 
    }).then(response => {
      if(response) {
        setTotalPage(response.meta?.num_pages);
        dispatch(fetchActionItemsSuccess(actionItemTableData(response.data, fetchActionItemsFunc, setTablePending, history)))
        setTablePending(false)
      }
    }).catch(e => dispatch(fetchActionItemsFailure(e.message)));
  }
  
  return (
    <>
      <Title>Action Items</Title>
      <Spacing m={{ t: "29px" }}>
        <Table
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={state.actionItems}
          head={actionItemsTableColumns}
          pending={tablePending}
        />
      </Spacing>
    </>
  );
};
