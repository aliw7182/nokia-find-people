import Button from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteCommunicationTemplateRequest,
  fetchCommunicationTemplateRequest,
  updateCommunicationTemplateRequest,
} from "../api/communicationTemplates";
import { CommunicationTemplateForm } from "../components/CommunicationTemplate";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { communicationTemplatesTableColumns } from "../content/columns.data";
import { communicationTemplatesData } from "../content/communicationTemplates.data";
import MentionIcon from "@atlaskit/icon/glyph/mention";

const CommunicationTemplatesBar = ({ history, search, setSearch }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <Box d="flex" align="flex-end">
          <SearchBar value={search} />
        </Box>
        <Button
          appearance="primary"
          onClick={() => history.push("/communications-templates-add")}
          iconBefore={<MentionIcon />}
        >
          Add Template
        </Button>
      </Box>
    </Spacing>
  </>
);

export const CommunicationTemplatesPage = (props) => {
  const history = useHistory();
  const query = new URLSearchParams(props.location.search);
  const [templates, setTemplates] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState(props.match.params.id);
  const [currentId, setCurrentId] = useState(-1);
  const [currentTemplate, setCurrentTemplate] = useState({});
  const [tablePending, setTablePending] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(query.get("page") || 1);
  const [search, setSearch] = useState(query.get("search") || "");
  const formRef = React.createRef();
  const head = communicationTemplatesTableColumns;

  const onDelete = (id) => {
    setRefresh(true);
    deleteCommunicationTemplateRequest(id)
      .catch((err) => toast.error("Error on server !"))
      .finally(() => {
        setRefresh(false);
        setIsOpen(false);
      });
  };

  useEffect(() => {
    setTablePending(true);
    const timer = setTimeout(
      () => {
        fetchCommunicationTemplateRequest().then((data) => {
          setTemplates(
            communicationTemplatesData(
              data,
              setIsOpen,
              setCurrentId,
              setIsOpenEdit,
              setCurrentTemplate
            )
          );
          setTablePending(false);
        });
      },
      search.length === 0 ? 0 : 1000
    );
    return () => clearTimeout(timer);
  }, [id, refresh, currentPage, search]);

  console.log(currentTemplate);

  return (
    <>
      <Title>Communication Templates</Title>
      <CommunicationTemplatesBar history={history} />
      <Spacing m={{ t: "23px" }}>
        <Table
          totalPage={!id && totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={templates}
          pending={tablePending}
          head={head}
        />
      </Spacing>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => onDelete(currentId)}
        positiveLabel="Delete"
        heading="Are you sure you want to remove this template?"
        body="You will no longer have access to this template"
        appearance="danger"
      />
      <ModalDialog
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        onClick={() => {
          console.log("HELLo");
          formRef.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }}
        positiveLabel="Update"
        body={
          <CommunicationTemplateForm
            ref={formRef}
            onSubmit={updateCommunicationTemplateRequest(currentTemplate?.id)}
            initialValues={currentTemplate}
            refresh={refresh}
            setRefresh={setRefresh}
            setIsOpenEdit={setIsOpenEdit}
            isUpdate={true}
          />
        }
        appearance="danger"
      />
    </>
  );
};
