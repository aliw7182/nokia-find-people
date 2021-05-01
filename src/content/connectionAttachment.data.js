import { FileName, formatDate, humanReadableFileSize } from "./childAttachment.data";

export const connectionAttachmentsRow = (data) => (
  data.map((item, index) => {
    const { attachment } = item;
    return {
      key: 1,
      cells: [
        {
          key: "file_name",
          content: <FileName attachment={attachment} />
        },
        {
          key: "file_size",
          content: humanReadableFileSize(attachment.file_size)
        },
        {
          key: "date",
          content: formatDate(attachment.created_at)
        }
      ]
    }
  })
)

export const head = [
  {
    key: "file_name",
    content: "File Name",
    width: 10,
  },
  {
    key: "file_size",
    content: "Size",
    width: 5,
  },
  {
    key: "date",
    content: "Date",
    width: 5,
  }
]