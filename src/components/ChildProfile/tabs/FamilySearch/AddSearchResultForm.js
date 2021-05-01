import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import { useContext, useEffect, useMemo, useState } from "react";
import { Box } from "../../../ui/atoms";
import Select from "@atlaskit/select";
import { WysiwygEditor } from "../../../WYSIWYG";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { ModalDialog } from "../../../ui/common";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import FilePicker from "../Attachments/FilePicker";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { AttachmentGroup, SelectInput } from "../../../ui/molecules";
import {
  createSearchResultRequest,
  updateSearchResultRequest,
  createSearchResultConnectionRequest,
  createSearchResultAttachmentRequest,
  deleteSearchResultAttachmentRequest,
  deleteSearchResultConnectionRequest,
} from "../../../../api/searchResults/searchResultsRequests";
import { toast } from "react-toastify";
import {
  createAttachmentRequest,
  createChildAttachmentRequest,
  removeAttachmentRequest,
} from "../../../../api/attachments/attachmentRequest";
import { uploadRequest } from "../../../../api/cloudinary";
import { useForm } from "react-hook-form";

export const AddSearchResultForm = ({
  currentSearchResult,
  setIsFormVisible,
  setIsOpen,
  vectors,
}) => {
  const {
    state: { child },
    connectionState,
    fetchSearchResults: fetch,
    fetchAttachments,
  } = useContext(ChildContext);
  const child_id = child.id;
  const [upd, setUpd] = useState(0);
  const user_id = getLocalStorageUser().id;
  const { control, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      search_vector:
        currentSearchResult && currentSearchResult.search_vector
          ? {
              label: currentSearchResult.search_vector.name,
              value: currentSearchResult.search_vector.id,
            }
          : null,
      connection:
        currentSearchResult && currentSearchResult.connection
          ? {
              label: `${currentSearchResult.connection.contact.first_name} ${currentSearchResult.connection.contact.last_name}`,
              value: currentSearchResult.connection.id,
            }
          : null,
    },
  });
  const [selectedConnection, setSelectedConnection] = useState(
    currentSearchResult && currentSearchResult.connection
      ? {
          label: `${currentSearchResult.connection.contact.first_name} ${currentSearchResult.connection.contact.last_name}`,
          value: currentSearchResult.connection.id,
        }
      : null
  );
  const [blocks, setBlocks] = useState([]);
  const [description, setDescription] = useState(
    currentSearchResult ? currentSearchResult.description : ""
  );
  const [selectedSearchVector, setSelectedSearchVector] = useState(
    currentSearchResult && currentSearchResult.search_vector
      ? {
          label: currentSearchResult.search_vector?.name,
          value: currentSearchResult.search_vector?.id,
        }
      : null
  );
  const [pending, setPending] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentFiles, setCurrentFiles] = useState(
    currentSearchResult ? currentSearchResult.attachments : []
  );
  const [filesForDeleting, setFilesForDeleting] = useState([]);
  const [assignedConnections, setAssignedConnections] = useState(
    currentSearchResult && currentSearchResult.connections
      ? currentSearchResult.connections.map(
          ({
            id,
            child_contact: {
              id: child_contact_id,
              contact: { first_name, last_name },
            },
          }) => ({
            label: `${first_name} ${last_name}`,
            value: child_contact_id,
            id: id,
          })
        )
      : []
  );
  const currentAssignedConnections = useMemo(() => assignedConnections, []);
  const [connectionsForDeleting, setConnectionsForDeleting] = useState([]);
  const connections = connectionState.connections.map((connection) => {
    if (connection && connection.contact) {
      const {
        contact: { first_name, last_name },
        id,
      } = connection;
      return {
        label: first_name + " " + last_name,
        value: id,
      };
    }
    return null;
  });

  const isObjectExist = (object) => {
    for (const obj of assignedConnections || []) {
      if (obj.value === object.value) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setConnectionsForDeleting(
      currentAssignedConnections
        ?.filter((item) => !isObjectExist(item))
        .map((item) => item.id)
    );
  }, [assignedConnections]);

  const onSubmitHandle = async ({
    search_vector: { value: search_vector_id },
    connection: { value: child_contact_id },
  }) => {
    let currentId;
    if (currentSearchResult) {
      setPending(true);
      currentId = currentSearchResult.id;
      await updateSearchResultRequest(currentSearchResult.id, {
        search_vector_id,
        child_contact_id,
        description: currentSearchResult
          ? currentSearchResult.description
          : description,
        blocks: JSON.stringify(blocks),
      });
      for (const id of connectionsForDeleting || []) {
        await deleteSearchResultConnectionRequest(id);
      }
      for (const { sr_attachment_id, attachment_id } of filesForDeleting) {
        await deleteSearchResultAttachmentRequest(sr_attachment_id);
        await removeAttachmentRequest(attachment_id);
      }
    } else {
      setPending(true);
      const { id } = await createSearchResultRequest({
        search_vector_id,
        description,
        child_contact_id,
        date_completed: new Date(),
        blocks: JSON.stringify(blocks),
        user_id,
        child_id,
      });
      currentId = id;
    }
    await createSearchResultConnections(currentId);
    await createSearchResultAttachments(currentId);
    await fetch();
    toast.success(
      currentSearchResult ? "Updated successfully!" : "Created successfully!"
    );
    fetchAttachments();
    clearForm();
    setPending(false);
  };

  const createSearchResultAttachments = async (id) => {
    if (files) {
      for (const file of files) {
        const {
          resource_type,
          original_filename,
          bytes,
          public_id,
          secure_url,
          format,
        } = await uploadRequest(file.file);
        if (!public_id) {
          alert("Upload failed. Try again!");
          return;
        }
        const attachment = await createAttachmentRequest({
          attachment: {
            file_name: original_filename,
            file_type: resource_type,
            file_url: secure_url,
            file_id: public_id,
            file_size: bytes,
            file_format: format,
            user_id,
          },
        });
        await createChildAttachmentRequest({
          child_attachment: {
            child_id: child_id,
            attachment_id: attachment.id,
          },
        });
        createAttachmentConnections(attachment.id);
        await createSearchResultAttachmentRequest(id, attachment.id);
      }
    }
  };

  const createAttachmentConnections = async (attachment_id) => {
    if (assignedConnections) {
      for (const connection of assignedConnections) {
        if (connection) {
          try {
            await createSearchResultConnectionRequest(
              attachment_id,
              connection.value
            );
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  };

  const createSearchResultConnections = async (id) => {
    if (assignedConnections) {
      for (const connection of assignedConnections) {
        if (connection) {
          try {
            await createSearchResultConnectionRequest(id, connection.value);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  };

  const clearForm = () => {
    if (setIsOpen) {
      setIsOpen(false);
      setCurrentFiles([]);
    } else {
      setIsFormVisible(false);
    }
    reset();
    files.forEach((file) => file.remove());
    setSelectedSearchVector(null);
    setSelectedConnection(null);
    setAssignedConnections([]);
    setFiles([]);
    setBlocks([]);
    setUpd(upd + 1);
  };

  useEffect(() => {
    console.log(blocks);
  }, [blocks]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <Box d="flex" mt="10px">
        <SelectInput
          register={{ required: true }}
          error={errors.search_vector}
          marginY="0px"
          className="input"
          name="search_vector"
          options={vectors}
          control={control}
          label="Select Search Vector"
          myValue={selectedSearchVector}
          myOnChange={setSelectedSearchVector}
        />
        <SelectInput
          marginX="10px"
          register={{ required: true }}
          error={errors.connection}
          marginY="0px"
          className="input"
          name="connection"
          options={connections}
          control={control}
          label="Select Connection"
          myValue={selectedConnection}
          myOnChange={setSelectedConnection}
        />
      </Box>
      {currentSearchResult?.search_vector?.in_continuous_search ? (
        <p
          dangerouslySetInnerHTML={{ __html: currentSearchResult.description }}
          style={{ marginBottom: 10 }}
        ></p>
      ) : (
        <div>
          <WysiwygEditor
            withMention={false}
            onChange={(tex, raw, html) => {
              setBlocks(
                raw?.blocks?.map(({ text, type, inlineStyleRanges }) => ({
                  text,
                  type,
                  inlineStyleRanges,
                }))
              );
              setDescription(html);
            }}
            defaultValue={description}
            upd={upd}
          />
        </div>
      )}

      <Select
        className="multi-select"
        classNamePrefix="react-select"
        isMulti
        menuPortalTarget={document.body}
        value={assignedConnections}
        onChange={(e) => setAssignedConnections(e)}
        styles={{
          control: (base) => ({
            ...base,
            width: 400,
            marginBottom: 10,
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        options={connections}
        placeholder="Choose a Connection(s)"
      />
      {currentFiles.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <AttachmentGroup
            data={currentFiles.map((f, i) => ({
              file_name: `${f.attachment.file_name} ${f.attachment.file_format}`,
              file_format: f.attachment.file_format,
              onClick: () => {
                setCurrentFiles((prev) =>
                  prev.filter((file) => file.id !== f.id)
                );
                setFilesForDeleting((prev) => [
                  ...prev,
                  { attachment_id: f.attachment_id, sr_attachment_id: f.id },
                ]);
              },
            }))}
            isRemovable
          />
        </div>
      )}
      <Box d="flex" justify="space-between">
        <ButtonGroup>
          <LoadingButton
            appearance="primary"
            type="submit"
            isLoading={pending}
            isDisabled={pending}
          >
            {currentSearchResult ? "Update" : "Add"} Search Result
          </LoadingButton>
          <Button
            appearance="subtle"
            iconBefore={<DocumentIcon />}
            onClick={() => setIsFileUploadModalOpen(true)}
          />
          {files && (
            <AttachmentGroup
              data={files.map((f, i) => ({
                file_name: f.file.name,
                file_format: f.file.name.split(".").pop(),
                onClick: () => {
                  f.remove();
                  setFiles((prev) =>
                    prev.filter((item) => item.meta.id !== f.meta.id)
                  );
                },
              }))}
              isRemovable
            />
          )}
        </ButtonGroup>
        <Button
          onClick={() => {
            clearForm();
          }}
          appearance="subtle"
        >
          Cancel
        </Button>

        <ModalDialog
          isOpen={isFileUploadModalOpen}
          setIsOpen={setIsFileUploadModalOpen}
          width="small"
          hasActions={false}
          body={
            <FilePicker
              user_id={user_id}
              setIsOpen={setIsFileUploadModalOpen}
              setFiles={setFiles}
            />
          }
        />
      </Box>
    </form>
  );
};
