import Button from "@atlaskit/button";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import { ACTIONS } from "../accessControl/actions";
import Can from "../accessControl/Can";
import { getLocalStorageUser } from "../context/auth/authProvider";
import { USERS } from "../helpers";
import { role_label } from "./sample.data";

const userTableData = (
  data,
  user,
  setIsOpen,
  setCurrentUser,
  history = null
) => {
  const isArray = Array.isArray(data);
  data = isArray ? data : (data = [data]);
  const { organization_id, role } = getLocalStorageUser();
  return data.map((item, index) => {
    var full_name = item?.first_name + " " + item?.last_name;
    const cells = fetchCells(
      !isArray ? (
        full_name
      ) : (
        <Button
          onClick={() => history.push("/users/" + item.id)}
          appearance="link"
          spacing="none"
        >
          {full_name}
        </Button>
      ),
      item.email,
      item.phone,
      user?.role === "super_admin"
        ? item.user_organizations?.map((item) => (
            <p>{item.organization?.name}</p>
          ))
        : null,
      item.user_organizations?.map((item) =>
        role !== "super_admin" ? (
          item.organization_id === organization_id && (
            <p>{role_label(item.role)}</p>
          )
        ) : (
          <p>{role_label(item.role)}</p>
        )
      ),
      <Can
        perform={`${USERS}:${ACTIONS.REMOVE}`}
        yes={() => (
          <Button
            isDisabled={user?.id === item.id}
            onClick={() => {
              setIsOpen(true);
              setCurrentUser(item.id);
            }}
            height="32px"
            width="32px"
          >
            <CrossIcon size="small" />
          </Button>
        )}
      />
    );
    return {
      key: index,
      cells: cells,
    };
  });
};

const fetchCells = (name, email, phone, organization = null, role, action) => {
  const cells1 = [
    {
      key: "name",
      content: name,
    },
    {
      key: "email",
      content: email,
    },
    {
      key: "phone",
      content: phone,
    },
  ];
  organization &&
    cells1.push({
      key: "organization",
      content: organization,
    });
  const cells2 = [
    {
      key: "role",
      content: role,
    },
    {
      key: "actions",
      content: <p align="center">{action}</p>,
    },
  ];
  return cells1.concat(cells2);
};

export { userTableData };
