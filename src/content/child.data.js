import Button from "@atlaskit/button";
import { Box } from "../components/ui/atoms";
import Lozenge from "@atlaskit/lozenge";
import { Avatar } from "../components/ui/molecules/Avatar";

const childTableData = (data, history, assignUser, isUser = true) =>
  data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "full_name",
        content: (
          <Box d="flex" align="center">
            <Avatar name={item.full_name} size="medium" ratio={0.4} isChild />
            <Button
              style={{ marginLeft: "8px" }}
              onClick={() => history.push("/children/" + item.id)}
              appearance="link"
              spacing="none"
            >
              {item.full_name}
            </Button>
          </Box>
        ),
      },
      {
        key: "permanency_goal",
        content: <p align="left">{item.permanency_goal}</p>,
      },
      {
        key: "continuous_search",
        content: <p align="center">{item.continuous_search}</p>,
      },
      {
        key: "days_in_system",
        content: <p align="center">{item.days_in_system}</p>,
      },
      {
        key: "connections",
        content: <p align="center">{item.relatives}</p>,
      },
      isUser && {
        key: "status",
        content: (
          <div align="center">
            {item.user_request ? (
              item.user_request.date_approved ? (
                <Lozenge appearance="success">Approved</Lozenge>
              ) : item.user_request.date_denied ? (
                <Button
                  appearance="link"
                  onClick={() => assignUser(item, true)}
                >
                  Request Access
                </Button>
              ) : (
                <Lozenge appearance="inprogress">Pending</Lozenge>
              )
            ) : (
              <Button appearance="link" onClick={() => assignUser(item)}>
                Request Access
              </Button>
            )}
          </div>
        ),
      },
    ],
  }));

export { childTableData };
