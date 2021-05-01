export const organizationsTableColumns = [
  {
    key: "name",
    content: "Name",
    width: 25,
  },
  {
    key: "address",
    content: "Address",
    width: 30,
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
    width: 10,
  },
];

export const communicationTemplatesTableColumns = [
  {
    key: "name",
    content: "Name",
    width: 25,
  },
  {
    key: "template_type",
    content: "Type",
    width: 33,
  },
  {
    key: "updated_at",
    content: "Last Edited Date",
    width: 15,
  },
  {
    key: "actions",
    content: <p align="center">Actions</p>,
    width: 15,
  },
];

export const usersTableColumns = (role = "user") => {
  const columns1 = [
    {
      key: "name",
      content: "Name",
      width: 25,
    },
    {
      key: "email",
      content: "Email",
      width: role === "user" ? 30 : 25,
    },
    {
      key: "phone",
      content: "Phone",
      width: role === "user" ? 20 : 15,
    },
  ];
  if (role === "super_admin")
    columns1.push({
      key: "organization",
      content: "Organization",
      width: 16,
    });
  const columns2 = [
    {
      key: "role",
      content: "Role",
      width: 15,
    },
  ];

  if (role !== "user") {
    columns2.push({
      key: "actions",
      content: <p align="center">Actions</p>,
      width: 10,
    });
  }
  return columns1.concat(columns2);
};

export const childrenTableColumns = (isUser = true) => [
  {
    key: "full_name",
    content: "Full Name",
    width: 30,
  },
  {
    key: "permanency_goal",
    content: "Permanency Goal",
    width: 25,
  },
  {
    key: "continuous_search",
    content: <p align="center">Continuous Search</p>,
    width: 15,
  },
  {
    key: "days_in_system",
    content: <p align="center">Days in system</p>,
    width: isUser ? 15 : 20,
  },
  {
    key: "connections",
    content: <p align="center">Connections</p>,
    width: isUser ? 15 : 20,
  },
  isUser && {
    key: "status",
    content: <p align="center">Status</p>,
    width: 15,
  },
];

export const searchVectorsTableColumns = [
  {
    key: "name",
    content: "Name",
    width: 15,
  },
  {
    key: "description",
    content: "Description",
    width: 25,
  },
  {
    key: "priority",
    content: <p align="center">Priority</p>,
    width: 15,
  },
  {
    key: "Actions",
    content: <p align="center">Actions</p>,
    width: 15,
  },
];

export const actionItemsTableColumns = [
  {
    key: "title",
    content: "Title",
    width: 15,
  },
  {
    key: "description",
    content: "Description",
    width: 25,
  },
  {
    key: "child",
    content: "Associated Child Case",
    width: 15,
  },
  {
    key: "resolve",
    content: <p align="center">Resolve</p>,
    width: 15,
  },
];

export const attachmentsTableColumns = [
  {
    key: "file_name",
    content: "File Name",
    width: 40,
  },
  {
    key: "size",
    content: "Size",
    width: 15,
  },
  {
    key: "author",
    content: "Author",
    width: 20,
  },
  {
    key: "date",
    content: "Date",
    width: 15,
  },
  {
    key: "action",
    content: <p align="center">Action</p>,
    width: 15,
  },
];

export const contactsTableColumns = [
  {
    key: "full_name",
    content: "Full name",
    width: 20,
  },
  {
    key: "relationship",
    content: "Relationship",
    width: 16,
  },
  {
    key: "birth_date",
    content: "Birth date",
    width: 12,
  },
  {
    key: "address",
    content: "Address",
    width: 37,
  },
  {
    key: "phone",
    content: "Phone number",
    width: 11,
  },
];

export const possibleConnectionColumns = [
  {
    key: "full_name",
    content: "Full Name",
    width: 25,
  },
  {
    key: "relationship",
    content: "Relationship",
    width: 15,
  },
  {
    key: "engagement",
    content: "Engagement",
    width: 18,
  },
  {
    key: "actions",
    content: <p align="center">Actions</p>,
    width: 15,
  },
];

export const confirmedConnectionColumns = [
  {
    key: "full_name",
    content: "Full Name",
    width: 23,
  },
  {
    key: "relationship",
    content: "Relationship",
    width: 10,
  },
  {
    key: "engagement",
    content: "Info & Engagement",
    width: 13,
  },
  {
    key: "link_score",
    content: "Link Score",
    width: 11,
  },
  {
    key: "actions",
    content: <p align="center">Actions</p>,
    width: 25,
  },
];

export const templatesSentTableColumns = [
  {
    key: "created",
    content: "Date",
    width: 20,
  },
  {
    key: "template_type",
    content: "Template Type",
    width: 20,
  },
  {
    key: "opened",
    content: "Status",
    width: 20,
  },
  {
    key: "updated_at",
    content: "Last update",
    width: 20,
  },
  {
    key: "actions",
    content: <p align="center">Actions</p>,
    width: 15,
  },
];
