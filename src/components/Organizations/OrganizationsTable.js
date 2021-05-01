import DynamicTable from "@atlaskit/dynamic-table";
import { useState } from "react";
import { TableWrapper } from "../ui/common";

const columns = [
  {
    key: "name",
    content: "Name",
    width: 25,
  },
  {
    key: "address",
    content: "Address",
    width: 33,
  },
  {
    key: "city",
    content: "City",
    width: 15,
  },
  {
    key: "state",
    content: "State",
    width: 15,
  },
  {
    key: "zip",
    content: "Zip",
    width: 8,
  },
];

export const OrganizationsTable = ({ items }) => {
  const [pending, setPending] = useState(true);
  return (
    <TableWrapper>
      <DynamicTable
        isLoading={pending}
        head={{ cells: columns }}
        rows={items}
        loadingSpinnerSize="large"
        onPageRowsUpdate={() => setPending(false)}
        isFixedSize
      />
    </TableWrapper>
  );
};
