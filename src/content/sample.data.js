export const tableData = (data, cells) => {
  var out = data.map((item, index) => {
    return {
      key: index,
      cells: fillCells(item, cells),
    };
  });
  console.log("out", out);
  return out;
};

export const fillCells = (data, cells) => {
  return cells.map((item) => {
    return {
      key: item.key,
      content: data[item.key] ? data[item.key] : "",
    };
  });
};

export const role_label = (role) => {
  switch (role) {
    case "super_admin":
      return "Super admin";
    case "admin":
      return "Organization admin";
    case "manager":
      return "Organization manager";
    default:
      return "Organization user";
  }
};
