const treeData = (contacts) => {
  const with_children = [
    "mother",
    "father",
    "grandmother_f",
    "grandmother_m",
    "grandfather_f",
    "grandfather_m",
  ];
  const rest_relatives = [];
  contacts.map((item) => {
    if (!with_children.includes(item.relationship))
      rest_relatives.push(item.relationship);
  });
  const emptyObject = {
    id: -1,
    contact: {
      first_name: "Unknown",
      last_name: "",
    },
  };
  let relative = emptyObject;
  const getChildren = (relatives) => {
    const children = [];
    relatives.map((item) => {
      if (item.id !== -1 || item.children?.length) children.push(item);
    });
    return children;
  };

  const getRelative = (relationship) => {
    const object =
      contacts.filter((obj) => obj.relationship === relationship)[0] ||
      emptyObject;
    relative = {
      id: object.id,
      name: `${object.contact.first_name} ${object.contact.last_name}`,
      title: getRelationTitle(relationship),
    };
    return relative;
  };
  const getRestRelations = (relations) =>
    relations.map((item) => getRelative(item));
  return {
    id: "1",
    name: "Shyngys Rakhad",
    title: "Child",
    children: getChildren([
      {
        ...getRelative("mother"),
        children: getChildren([
          getRelative("grandmother_m"),
          getRelative("grandfather_m"),
        ]),
      },
      {
        ...getRelative("father"),
        children: getChildren([
          getRelative("grandmother_f"),
          getRelative("grandfather_f"),
        ]),
      },
      ...getRestRelations(rest_relatives),
    ]),
  };
};

const getRelationTitle = (relation) => {
  switch (relation) {
    case "father":
      return "Father";
    case "mother":
      return "Mother";
    case "sister":
      return "Sister";
    case "brother":
      return "Brother";
    case "grandfather_f" || "grandfather_m":
      return "Grandfather";
    case "grandmother_f" || "grandmother_m":
      return "Grandmother";
    case "uncle":
      return "Uncle";
    case "cousin":
      return "Cousin";
    case "aunt":
      return "Aunt";
    default:
      return relation;
  }
};

export { treeData, getRelationTitle };
