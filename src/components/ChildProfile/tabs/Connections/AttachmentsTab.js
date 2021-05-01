import Button from "@atlaskit/button";
import {
  createChildAttachmentRequest,
  createConnectionAttachmentRequest,
} from "../../../../api/attachments/attachmentRequest";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { Box, Spacing } from "../../../ui/atoms";
import { ModalDialog } from "../../../ui/common";
import { Table } from "../../../ui/common/Table";
import FilePicker from "../Attachments/FilePicker";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { useContext, useState } from "react";
import { ConnectionContext } from "./ConnectionModal";
import { head } from "../../../../content/connectionAttachment.data";
import { ChildContext } from "../../../../pages/ChildProfilePage";

export const AttachmentsTab = ({ connection }) => {
  const {
    attachmentState: { attachments, loading },
    fetchAttachments,
    fetchConnections,
  } = useContext(ConnectionContext);
  const fetchAttachmentsInChildProfile = useContext(ChildContext)
    .fetchAttachments;
  const user_id = getLocalStorageUser().id;
  const [isOpen, setIsOpen] = useState(false);
  const [shouldCloseOnEscapePress, setShouldCloseOnEscapePress] = useState(
    true
  );
  const [shouldCloseOnOverlayClick, setShouldCloseOnOverlayClick] = useState(
    true
  );

  const onSubmit = async (attachment_id) => {
    await createChildAttachmentRequest({
      child_attachment: {
        child_id: connection.child_id,
        attachment_id: attachment_id,
      },
    });
    await createConnectionAttachmentRequest({
      connection_attachment: {
        child_contact_id: connection.id,
        attachment_id: attachment_id,
      },
    });
  };

  const fetch = () => {
    fetchConnections();
    fetchAttachments();
    fetchAttachmentsInChildProfile();
  };

  const setClosable = (bool) => {
    setShouldCloseOnEscapePress(bool);
    setShouldCloseOnOverlayClick(bool);
  };

  return (
    <div>
      <Spacing m={{ t: "23px" }}>
        <Box w="100%" d="flex" direction="row-reverse">
          <Button
            appearance="primary"
            iconBefore={<DocumentIcon />}
            onClick={() => setIsOpen(true)}
          >
            Upload New File
          </Button>
          <ModalDialog
            shouldCloseOnEscapePress={shouldCloseOnEscapePress}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width="small"
            hasActions={false}
            body={
              <FilePicker
                user_id={user_id}
                setIsOpen={setIsOpen}
                fetchAttachments={fetch}
                setClosable={setClosable}
                onSubmit={onSubmit}
              />
            }
          />
        </Box>
      </Spacing>
      <Spacing m={{ t: "23px", b: "50px" }}>
        <Table head={head} items={attachments} pending={loading} />
      </Spacing>
    </div>
  );
};
