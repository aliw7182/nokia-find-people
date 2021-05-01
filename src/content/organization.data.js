import Button from "@atlaskit/button";

const organizationTableData = (data, history) => {
  const isArray = Array.isArray(data);
  data = isArray ? data : (data = [data]);
  return data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "name",
        content: !isArray ? (
          item.name
        ) : (
          <Button
            onClick={() => history.push("/organizations/" + item.id)}
            appearance="link"
            spacing="none"
          >
            {item.name}
          </Button>
        ),
      },
      {
        key: "address",
        content: item.address,
      },
      {
        key: "city",
        content: item.city,
      },
      {
        key: "state",
        content: item.state,
      },
      {
        key: "zip",
        content: item.zip,
      },
    ],
  }));
};

export { organizationTableData };
