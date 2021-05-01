import { Box, Spacing } from "../../../ui/atoms";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { childAttachmentTableData } from "../../../../content/childAttachment.data";
import { Table } from "../../../ui/common/Table";
import { attachmentsTableColumns } from "../../../../content/columns.data";
import Button from "@atlaskit/button";
import { ModalDialog } from "../../../ui/common";
import { useContext, useState } from "react";
import FilePicker from './FilePicker'
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { fetchAttachmentsRequest } from "../../../../reducers/attachment";
import { createChildAttachmentRequest, createConnectionAttachmentRequest } from "../../../../api/attachments/attachmentRequest";
import TagGroup from "@atlaskit/tag-group";
import Select from "@atlaskit/select";
import Tag from "@atlaskit/tag";
import { fetchAttachmentConnectionsRequest, removeConnectionAttachmentsRequest } from "../../../../api/childContact";

export const AttachmentsPage = () => {
  const { state: { child: { id } }, attachmentState: { attachments, loading }, connectionState: { connections }, attachmentDispatch, fetchAttachments } = useContext(ChildContext)
  const [ isOpen, setIsOpen ] = useState(false);
  const user_id = getLocalStorageUser().id;
  const [ shouldCloseOnEscapePress, setShouldCloseOnEscapePress ] = useState(true)
  const [ shouldCloseOnOverlayClick, setShouldCloseOnOverlayClick ] = useState(true)
  const [ isContactModalOpen, setIsContactModalOpen ] = useState(false)
  const [ assignedConnections, setAssignedConnections ] = useState([]);
  const [ validationState, setValidationState ] = useState("default");
  const [ notAssignedConnections, setNotAssignedConnections ] = useState([])
  const [ preparedConnections, setPreparedConnections ] = useState(null)
  const [ currentAttachmentId, setCurrentAttachmentId ] = useState(null)

  const setClosable = (bool) => {
    setShouldCloseOnEscapePress(bool)
    setShouldCloseOnOverlayClick(bool)
  }

  const setPending = () => {
    attachmentDispatch(fetchAttachmentsRequest())
  }

  const onSubmit = async (attachment_id) => {
    await createChildAttachmentRequest({
      "child_attachment": {
        "child_id": id,
        "attachment_id": attachment_id
      }
    });
  }

  const fetchConnections = (id) => {
    fetchAttachmentConnectionsRequest(id)
      .then(data => {
        if (data){
          setAssignedConnections(data.attachment_connections)
          if (data.attachment_connections.length > 0){
            setNotAssignedConnections(connections.filter(item => filter(data.attachment_connections, item.id)).map(connection => ({
              label: `${connection.contact.first_name} ${connection.contact.last_name}`,
              value: connection.id,
            })))
          }else{
            setNotAssignedConnections(connections.map(connection => ({
              label: `${connection.contact.first_name} ${connection.contact.last_name}`,
              value: connection.id,
            })))
          }
        }
      })
  }

  const filter = (array, newId) => array.find(item => item.child_contact_id === newId) === undefined

  const onSubmitConnection = async () => {
    if (preparedConnections && preparedConnections.length > 0){
      preparedConnections.forEach((connection, index) => {
        createConnectionAttachmentRequest({
          connection_attachment: {
            child_contact_id: connection.value,
            attachment_id: currentAttachmentId
          }
        })
      })
      setIsContactModalOpen(false)
    }else{
      setValidationState("error");
    }
  };

  const openModal = (id) => {
    setCurrentAttachmentId(id)
    setPreparedConnections(null);
    setIsContactModalOpen(true);
    fetchConnections(id)
  };

  const removeAssignedConnection = (id) => {
    removeConnectionAttachmentsRequest(id)
      .then(() => fetchConnections(currentAttachmentId))
  };

  return (
    <div>
      <Spacing m={{ t: "23px" }}>
        <Box w="100%" d="flex" direction="row-reverse">
          <Button appearance="primary" iconBefore={<DocumentIcon />} onClick={() => setIsOpen(true)}>
            Upload New File
          </Button>
          <ModalDialog
            shouldCloseOnEscapePress={shouldCloseOnEscapePress}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width="small"
            hasActions={false}
            body={<FilePicker user_id={user_id} setIsOpen={setIsOpen} fetchAttachments={fetchAttachments} setClosable={setClosable} onSubmit={onSubmit}/>}
            />
        </Box>
      </Spacing>
      <Spacing m={{ t: "23px" }}>
        <Table
          pending={loading}
          head={attachmentsTableColumns}
          items={childAttachmentTableData(attachments, fetchAttachments, setPending, openModal)}
        />
      </Spacing>
      <ModalDialog
        isOpen={isContactModalOpen}
        setIsOpen={setIsContactModalOpen}
        heading="Assign a Connection"
        positiveLabel="Assign"
        onClick={() => onSubmitConnection()}
        width="small"
        body={
          <>
            <TagGroup>
              {assignedConnections.map((attachment_connection) => (
                <Tag
                  appearance="rounded"
                  text={`${attachment_connection.connection.contact.first_name} ${attachment_connection.connection.contact.last_name}`}
                  onBeforeRemoveAction={() => {
                    removeAssignedConnection(attachment_connection.id);
                    return false;
                  }}
                />
              ))}
            </TagGroup>
            <Select
              className="multi-select"
              classNamePrefix="react-select"
              isMulti
              menuPortalTarget={document.body}
              value={preparedConnections}
              validationState={validationState}
              onChange={(e) => {
                setPreparedConnections(e);
                setValidationState("default");
              }}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              options={notAssignedConnections}
              placeholder="Choose a Contacts(s)"
            />
          </>
        }
      />
    </div>
  );
}
