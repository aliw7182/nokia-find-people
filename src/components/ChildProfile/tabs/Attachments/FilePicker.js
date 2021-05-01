import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { Box, Spacing } from "../../../ui/atoms";
import {
  DropzoneLayout,
  DropzonePreview,
  DropzoneSubmitButton,
} from "../../../ui/molecules";
import { uploadRequest } from "../../../../api/cloudinary";
import { createAttachmentRequest } from "../../../../api/attachments/attachmentRequest";
import { useState } from "react";
import Folder48Icon from "@atlaskit/icon-file-type/glyph/folder/48";
import { toast } from "react-toastify";

export default function FilePicker({
  user_id,
  setIsOpen,
  fetchAttachments,
  setClosable,
  onSubmit,
  setFiles,
}) {
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };
  const [pending, setPending] = useState(false);
  const handleSubmit = (files, allFiles) => {
    setPending(true);
    if (setFiles) {
      setFiles((prev) => (prev ? prev.concat(allFiles) : allFiles));
      setPending(false);
      setIsOpen(false);
    } else {
      allFiles.forEach(async (f, index) => {
        const {
          resource_type,
          original_filename,
          bytes,
          public_id,
          secure_url,
          format,
        } = await uploadRequest(f.file);
        if (!public_id) {
          alert("Upload failed. Try again!");
          setPending(false);
          return;
        }
        const { id } = await createAttachmentRequest({
          attachment: {
            file_name: original_filename,
            file_type: resource_type,
            file_url: secure_url,
            file_id: public_id,
            file_size: bytes,
            file_format: format,
            user_id: user_id,
          },
        });
        await onSubmit(id);
        if (index === allFiles.length - 1) {
          setPending(false);
          setIsOpen(false);
          toast.success("Uploaded successfully!");
          fetchAttachments();
        }
      });
    }
  };

  return (
    <Spacing m={{ t: "30px", b: "30px" }}>
      <Dropzone
        inputContent={
          <Box d="flex" direction="column" align="center">
            <Folder48Icon size="xlarge" />
            <span style={{ fontSize: "15px" }}>
              Drag Files or Click to Browse
            </span>
          </Box>
        }
        PreviewComponent={DropzonePreview}
        LayoutComponent={(e) => (
          <DropzoneLayout
            {...e}
            setIsOpen={setIsOpen}
            setClosable={setClosable}
          />
        )}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*,application/*"
        submitButtonDisabled={pending}
        submitButtonContent="Upload"
        SubmitButtonComponent={DropzoneSubmitButton}
      />
    </Spacing>
  );
}
