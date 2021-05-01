import PdfDocument16Icon from "@atlaskit/icon-file-type/glyph/pdf-document/16";
import Generic16Icon from "@atlaskit/icon-file-type/glyph/generic/16";
import PowerpointPresentation16Icon from "@atlaskit/icon-file-type/glyph/powerpoint-presentation/16";
import WordDocument16Icon from "@atlaskit/icon-file-type/glyph/word-document/16";
import ExcelSpreadsheet16Icon from "@atlaskit/icon-file-type/glyph/excel-spreadsheet/16";
import Image16Icon from "@atlaskit/icon-file-type/glyph/image/16";
import Video16Icon from "@atlaskit/icon-file-type/glyph/video/16";
import { Rounded } from "../../../ui/molecules/Rounded";
import EditorCloseIcon from "@atlaskit/icon/glyph/editor/close";
import { Box } from "../../../ui/atoms";
import Button from "@atlaskit/button";

export const AttachmentTag = ({
  file_format,
  file_name,
  onClick = () => {},
  isRemovable,
}) => {
  return (
    <Rounded
      content={
        <AttachmentItem
          file_format={file_format}
          file_name={file_name}
          isRemovable={isRemovable}
        />
      }
      onClick={onClick}
      isRemovable={isRemovable}
    />
  );
};

export const AttachmentItem = ({ file_format, file_name, isRemovable }) => {
  return (
    <Box d="flex" align="center" justify="space-between">
      <div>
        <AttachmentIcon file_format={file_format} />
        <span
          style={{
            marginLeft: "10px",
            color: "#455670",
            marginRight: isRemovable && "10px",
          }}
        >
          {file_name}
        </span>
      </div>
      {isRemovable && <div style={{ cursor: "pointer" }}>✕</div>}
    </Box>
  );
};

const AttachmentIcon = ({ file_format }) => {
  switch (file_format) {
    case "ppt":
    case "pptx":
      return <PowerpointPresentation16Icon />;
    case "doc":
    case "docx":
      return <WordDocument16Icon />;
    case "xlsx":
    case "xlsm":
    case "xlsb":
    case "xls":
      return <ExcelSpreadsheet16Icon />;
    case "png":
    case "jpeg":
    case "jpg":
      return <Image16Icon />;
    case "mp4":
      return <Video16Icon />;
    case "pdf":
      return <PdfDocument16Icon />;
    default:
      return <Generic16Icon />;
  }
};
