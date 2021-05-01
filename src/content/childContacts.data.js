import moment from "moment";

const childContactsTableData = (data) =>
  data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "full_name",
        content: `${item?.contact?.first_name || ""} ${
          item?.contact?.last_name || ""
        }`,
      },
      {
        key: "relationship",
        content: item?.contact?.relationship,
      },
      {
        key: "birth_date",
        content: moment(item.contact?.birthday).format('YYYY-MM-DD'),
      },
      {
        key: "address",
        content: item.contact?.address,
      },
      {
        key: "phone",
        content: item.contact?.phone,
      },
    ],
  }));

export { childContactsTableData };
