import { Box } from "../components/ui/atoms";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import Button, { ButtonGroup } from "@atlaskit/button";
import { useState } from "react";
import { ModalDialog } from "../components/ui/common";
import { deleteActionItem } from "../context/actionItems/actionItemProvider";
import { approveChildUserRequest, denyChildUserRequest } from "../api/children";
import CheckCircleIcon from "@atlaskit/icon/glyph/check-circle";
import CrossCircleIcon from "@atlaskit/icon/glyph/cross-circle";
import { createActionItemRequest } from "../api/actionItems";
import { Avatar } from "../components/ui/molecules/Avatar";

const actionItemTableData = (data, fetch, setTablePending, history) => {
  console.log(data);
  return data.map(function (item, index) {
    return {
      key: index,
      cells: [
        {
          key: "title",
          content: item.title,
        },
        {
          key: "description",
          content: item.description,
        },
        item.child
          ? {
              key: "child",
              content: (
                <Box d="flex" align="center">
                  <Avatar
                    name={item.child.first_name + " " + item.child.last_name}
                    size="medium"
                    isChild
                  />
                  <Button
                    appearance="link"
                    onClick={() => history.push(`children/${item.child.id}`)}
                  >
                    {item.child.first_name + " " + item.child.last_name}
                  </Button>
                </Box>
              ),
            }
          : {
              key: "child",
              content: "",
            },
        {
          key: "resolve",
          content: (
            <div align="center">
              <Action
                type={item.action_type}
                id={item.id}
                fetch={fetch}
                user_id={item.related_user_id}
                child_id={item.child_id}
                setPending={setTablePending}
              />
            </div>
          ),
        },
      ],
    };
  });
};

const Action = ({ type, id, fetch, user_id, child_id, setPending }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onDelete = (id) => {
    deleteActionItem(id)
      .then(() => fetch())
      .finally(() => setIsOpen(false));
  };

  const onApprove = async (id, user_id, child_id) => {
    setPending(true);
    await deleteActionItem(id);
    await approveChildUserRequest(user_id, child_id);
    await createActionItemRequest({
      action_item: {
        title: "Access granted",
        description: `You have been assigned to a child`,
        child_id: child_id,
        user_id: user_id,
        action_type: "access_granted",
      },
    })
      .then(() => fetch())
      .catch(() => setPending(false));
  };

  const onDeny = async (id, user_id, child_id) => {
    setPending(true);
    await deleteActionItem(id);
    await denyChildUserRequest(user_id, child_id);
    await createActionItemRequest({
      action_item: {
        title: "Access denied",
        description: `Your request has been denied`,
        child_id: child_id,
        user_id: user_id,
        action_type: "access_denied",
      },
    })
      .then(() => fetch())
      .catch(() => setPending(false));
  };
  switch (type) {
    case "mention":
    case "access_granted":
    case "access_denied":
      return (
        <>
          <Button onClick={() => setIsOpen(true)} height="32px" width="32px">
            <CrossIcon size="small" />
          </Button>
          <ModalDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClick={() => onDelete(id)}
            positiveLabel="Delete"
            heading="Are you sure you want to remove this action?"
            body="You will no longer have access to this item"
            appearance="danger"
          />
        </>
      );
    case "access_request":
      return (
        <ButtonGroup>
          <Button
            iconBefore={<CheckCircleIcon />}
            onClick={() => onApprove(id, user_id, child_id)}
          >
            Approve
          </Button>
          <Button
            iconBefore={<CrossCircleIcon />}
            onClick={() => onDeny(id, user_id, child_id)}
          >
            Deny
          </Button>
        </ButtonGroup>
      );
    default:
      return <></>;
  }
};

export { actionItemTableData };
