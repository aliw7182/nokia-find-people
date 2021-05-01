import Button, { ButtonGroup } from "@atlaskit/button";
import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import EmailIcon from "@atlaskit/icon/glyph/email";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import React from "react";
import { ACTIONS } from "../accessControl/actions";
import Can from "../accessControl/Can";
import { Box, Spacing } from "../components/ui/atoms";
import { Avatar } from "../components/ui/molecules/Avatar";
import { CONNECTIONS } from "../helpers";

export const possibleConnectionRows = (
  data,
  openModal,
  setCurrentConnection,
  setIsConfirmModalOpen,
  setIsAddModalOpen
) =>
  data
    .filter((item) => item && !item.is_confirmed)
    .map(
      (item, index) =>
        item &&
        item.contact && {
          key: index,
          cells: [
            {
              key: "full_name",
              content: (
                <Box d="flex" align="center">
                  <Avatar
                    name={`${item.contact.first_name} ${item.contact.last_name}`}
                    size="medium"
                    ratio={0.4}
                  />
                  <Box d="flex" align="center">
                    <Button
                      appearance="link"
                      spacing="none"
                      style={{ marginLeft: "8px" }}
                      onClick={() => openModal("main", item)}
                    >
                      {`${item.contact.first_name} ${item.contact.last_name}`}
                    </Button>
                  </Box>
                </Box>
              ),
            },
            {
              key: "relationship",
              content: item.relationship,
            },
            {
              key: "engagement",
              content: (
                <Box d="flex">
                  <Button
                    appearance="link"
                    spacing="none"
                    style={{ marginRight: "17px" }}
                  >
                    <Box d="flex" align="center">
                      <Spacing m={{ r: "4px" }}>{item.templates_size}</Spacing>
                      <EmailIcon />
                    </Box>
                  </Button>
                  <Button
                    appearance="link"
                    spacing="none"
                    style={{ marginRight: "17px" }}
                  >
                    <Box d="flex" align="center">
                      <Spacing m={{ r: "4px" }}> {item.alerts_size}</Spacing>
                      <NotificationIcon />
                    </Box>
                  </Button>
                  <Button appearance="link" spacing="none">
                    <Box d="flex" align="center">
                      <Spacing m={{ r: "4px" }}>
                        {item.attachments_size}
                      </Spacing>
                      <AttachmentIcon />
                    </Box>
                  </Button>
                </Box>
              ),
            },
            {
              key: "actions",
              content: (
                <Can
                  perform={`${CONNECTIONS}:${ACTIONS.EDIT}`}
                  yes={() => (
                    <div align="center">
                      <ButtonGroup>
                        <Button
                          onClick={() => {
                            setCurrentConnection(item);
                            setIsAddModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            setCurrentConnection(item);
                            setIsConfirmModalOpen(true);
                          }}
                        >
                          Confirm
                        </Button>
                      </ButtonGroup>
                    </div>
                  )}
                />
              ),
            },
          ],
        }
    );
