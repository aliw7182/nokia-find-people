export const relationshipOptions = [
  { label: "Mother", value: "Mother", parent: "Child" },
  { label: "Father", value: "Father", parent: "Child" },
  {
    label: "Maternal Grandfather",
    value: "Maternal Grandfather",
    parent: "Mother",
  },
  {
    label: "Maternal Grandmother",
    value: "Maternal Grandmother",
    parent: "Mother",
  },
  {
    label: "Paternal Grandfather",
    value: "Paternal Grandfather",
    parent: "Father",
  },
  {
    label: "Paternal Grandmother",
    value: "Paternal Grandmother",
    parent: "Father",
  },
  { label: "Maternal Aunt", value: "Maternal Aunt", parent: "Mother" },
  { label: "Maternal Uncle", value: "Maternal Uncle", parent: "Mother" },
  { label: "Paternal Aunt", value: "Paternal Aunt", parent: "Father" },
  { label: "Paternal Uncle", value: "Paternal Uncle", parent: "Father" },
  { label: "Other", value: "Other", parent: false },
];

export const sideRelatives = [
  "Maternal Aunt",
  "Maternal Uncle",
  "Paternal Aunt",
  "Paternal Uncle",
];

export const parents = ["Mother", "Father"];
