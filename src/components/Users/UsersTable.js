import DynamicTable from "@atlaskit/dynamic-table";
import React, { useState } from "react";
import { TableWrapper } from "../ui/common";

const columns = [
  {
    key: "name",
    content: "Name",
    width: 25,
  },
  {
    key: "email",
    content: "Email",
    width: 25,
  },
  {
    key: "phone",
    content: "Phone",
    width: 15,
  },
  {
    key: "organization",
    content: "Organization",
    width: 16,
  },
  {
    key: "role",
    content: "Role",
    width: 15,
  },
  {
    key: "actions",
    content: "Actions",
    width: 10,
  },
];

export const UsersTable = ({ items }) => {
  const [pending, setPending] = useState(true);
  return (
    <TableWrapper>
      <DynamicTable
        isLoading={pending}
        head={{ cells: columns }}
        rows={items}
        onPageRowsUpdate={() => setPending(false)}
        isFixedSize
      />
    </TableWrapper>
  );
};
