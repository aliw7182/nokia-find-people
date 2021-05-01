import Button, { ButtonGroup } from "@atlaskit/button";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { StyledLabel } from "../../ChildInformation";
import { useState } from "react";
import { AvatarGroup, AttachmentGroup } from "../../../ui/molecules";
import { ModalDialog } from "../../../ui/common";
import { AddSearchResultForm } from "./AddSearchResultForm";
import Badge from "@atlaskit/badge";
import Can from "../../../../accessControl/Can";
import { FAMILY_SEARCH } from "../../../../helpers";
import { ACTIONS } from "../../../../accessControl/actions";
import { updateSearchResultRequest } from "../../../../api/searchResults/searchResultsRequests";
import { toast } from "react-toastify";
import { Avatar } from "../../../ui/molecules/Avatar";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const FamilySearchItem = ({ item, noEdit, noMeta, vectors, fetch }) => {
  const {
    id,
    created_at,
    description,
    user,
    attachments,
    connections,
    search_vector,
    date_completed,
    date_accepted,
    date_rejected,
    connection,
    updated_at,
  } = item;
  let date = new Date(created_at);
  let date_updated = new Date(updated_at);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const onAccept = () => {
    updateSearchResultRequest(id, {
      date_accepted: new Date(),
      date_rejected: null,
      date_completed: new Date(),
    })
      .then(() => {
        toast.success("Search Result is accepted!");
        fetch();
      })
      .catch(() => toast.error("Couldn't accept"));
  };

  const onReject = () => {
    updateSearchResultRequest(id, {
      date_accepted: null,
      date_rejected: new Date(),
      date_completed: new Date(),
    })
      .then(() => {
        toast.success("Search Result is rejected!");
        fetch();
      })
      .catch(() => toast.error("Couldn't reject"));
  };

  return (
    <Box d="flex" mt="5px">
      <Box d="flex" direction="column" w="75px">
        <Title>{date.getDate()}</Title>
        <span>{months[date.getMonth()]}</span>
        <span>{date.getFullYear()}</span>
      </Box>
      <div style={{ marginLeft: "16px", width: "100%" }}>
        <b>{search_vector.name}</b>
        {connection && (
          <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
            <Avatar
              name={`${connection.contact.first_name} ${connection.contact.last_name}`}
              size="medium"
            />
            <span
              style={{ marginLeft: 8 }}
            >{`${connection.contact.first_name} ${connection.contact.last_name}`}</span>
            {!date_completed && (
              <span style={{ marginLeft: 8 }}>
                <Badge appearance="added">Pending</Badge>
              </span>
            )}
          </div>
        )}
        <div
          style={{
            marginTop: 10,
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        {!noMeta && (
          <Box mt="11px" d="flex">
            <ButtonGroup>
              <AvatarGroup
                data={connections.map(
                  ({
                    child_contact: {
                      contact: { first_name, last_name },
                    },
                  }) => ({
                    name: first_name + " " + last_name,
                  })
                )}
              />
              <AttachmentGroup
                data={attachments.map(({ attachment }) => ({
                  ...attachment,
                  onClick: () => {
                    window.open(attachment.file_url, "_blank");
                  },
                }))}
              />
            </ButtonGroup>
          </Box>
        )}
        <Box d="flex" justify="space-between" align="baseline" mt="10px">
          <StyledLabel>
            <b>
              Updated on {date_updated.toDateString()} at{" "}
              {date_updated.getHours()}:{date_updated.getMinutes()} by{" "}
              {user.first_name} {user.last_name}
            </b>
          </StyledLabel>
          {!noEdit && (
            <>
              <ButtonGroup>
                <Can
                  perform={`${FAMILY_SEARCH}:${ACTIONS.EDIT}`}
                  authorId={user.id}
                  yes={() => (
                    <Button
                      appearance="link"
                      spacing="compact"
                      onClick={() => setIsEditOpen(true)}
                    >
                      Edit Result
                    </Button>
                  )}
                />
                <Can
                  perform={`${FAMILY_SEARCH}:${ACTIONS.ACCEPT}`}
                  yes={() => (
                    <Button
                      appearance="link"
                      spacing="compact"
                      onClick={() => onAccept()}
                      isDisabled={date_accepted !== null}
                      title={
                        search_vector.in_continuous_search &&
                        "Cannot accept accepted Search Result"
                      }
                    >
                      Accept
                    </Button>
                  )}
                />
                <Can
                  perform={`${FAMILY_SEARCH}:${ACTIONS.REJECT}`}
                  yes={() => (
                    <Button
                      appearance="link"
                      spacing="compact"
                      onClick={() => onReject()}
                    >
                      Reject
                    </Button>
                  )}
                />
              </ButtonGroup>
              <ModalDialog
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                width="large"
                hasActions={false}
                body={
                  <div style={{ margin: "20px 0" }}>
                    <AddSearchResultForm
                      vectors={vectors}
                      currentSearchResult={item}
                      setIsOpen={setIsEditOpen}
                    />
                  </div>
                }
              />
            </>
          )}
        </Box>
        <Spacing
          style={{ borderBottom: "1px solid #dee1e5" }}
          m={{ t: "8px", b: "8px" }}
        />
      </div>
    </Box>
  );
};
