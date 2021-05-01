import PdfDocument24Icon from "@atlaskit/icon-file-type/glyph/pdf-document/24";
import Generic24Icon from "@atlaskit/icon-file-type/glyph/generic/24";
import PowerpointPresentation24Icon from "@atlaskit/icon-file-type/glyph/powerpoint-presentation/24";
import WordDocument24Icon from "@atlaskit/icon-file-type/glyph/word-document/24";
import ExcelSpreadsheet24Icon from "@atlaskit/icon-file-type/glyph/excel-spreadsheet/24";
import Image24Icon from "@atlaskit/icon-file-type/glyph/image/24";
import Video24Icon from "@atlaskit/icon-file-type/glyph/video/24";
import { Box } from "../components/ui/atoms";
import Button, { ButtonGroup } from "@atlaskit/button";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import {
  removeAttachmentRequest,
  removeChildAttachmentRequest,
} from "../api/attachments/attachmentRequest";
import Can from "../accessControl/Can";
import { ATTACHMENTS } from "../helpers";
import { ACTIONS } from "../accessControl/actions";

const childAttachmentTableData = (data, fetchAttachments, setPending, openModal) => {
  return (
    data &&
    data.map((item, index) => {
      const attachment = item.attachment;
      const author = attachment.user;
      return {
        key: index,
        cells: [
          {
            key: "file_name",
            content: <FileName attachment={attachment} />,
          },
          {
            key: "size",
            content: humanReadableFileSize(attachment.file_size),
          },
          {
            key: "author",
            content: `${author.first_name} ${author.last_name}`,
          },
          {
            key: "date",
            content: formatDate(item.created_at),
          },
          {
            key: "action",
            content: (
              <ButtonGroup>
                <Button onClick={() => openModal(attachment.id)}>Connection</Button>
                <Can
                  perform={`${ATTACHMENTS}:${ACTIONS.REMOVE}`}
                  authorId={attachment.user_id}
                  yes={() => (
                    <div align="center">
                      <Button
                        onClick={async () => {
                          setPending(true);
                          await removeChildAttachmentRequest(item.id);
                          await removeAttachmentRequest(item.attachment_id);
                          fetchAttachments()
                        }}
                        height="32px"
                        width="32px"
                      >
                        <CrossIcon size="small" />
                      </Button>
                    </div>
                  )}
                />
              </ButtonGroup>
            ),
          },
        ],
      };
    })
  );
};

export const FileName = ({ attachment }) => (
  <Box d="flex" align="center">
    <AttachmentIcon file_format={attachment.file_format} />
    <Button
      href={attachment.file_url}
      target="_blank"
      appearance="link"
    >{`${attachment.file_name}.${
      attachment.file_format || ""
    }`}</Button>
  </Box>
)

export const AttachmentIcon = ({ file_format }) => {
  switch (file_format) {
    case "ppt":
    case "pptx":
      return <PowerpointPresentation24Icon />;
    case "doc":
    case "docx":
      return <WordDocument24Icon />;
    case "xlsx":
    case "xlsm":
    case "xlsb":
    case "xls":
      return <ExcelSpreadsheet24Icon />;
    case "png":
    case "jpeg":
    case "jpg":
      return <Image24Icon />;
    case "mp4":
      return <Video24Icon />;
    case "pdf":
      return <PdfDocument24Icon />;
    default:
      return <Generic24Icon />;
  }
};

export function formatDate(date) {
  let currentDate = new Date(date);
  var fd = currentDate.toDateString();
  return fd;
}

export function humanReadableFileSize(bytes, si = true, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

export { childAttachmentTableData };
