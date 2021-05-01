import Badge from "@atlaskit/badge";
import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { fetchConnectionsRequest } from "../../../../api/childContact";
import { connectionAttachmentsRow } from "../../../../content/connectionAttachment.data";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import {
  alertReducer,
  fetchAlertsFailure,
  fetchAlertsRequest,
  fetchAlertsSuccess,
  initialState as alertInitialState,
} from "../../../../reducers/alertLinks";
import {
  attachmentReducer,
  fetchAttachmentsFailure,
  fetchAttachmentsRequest,
  fetchAttachmentsSuccess,
  initialState as attachmentInitialState,
} from "../../../../reducers/attachment";
import {
  commentReducer,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess,
  initialState as commentInitialState,
} from "../../../../reducers/comment";
import {
  fetchTemplatesFailure,
  fetchTemplatesRequest,
  fetchTemplatesSuccess,
} from "../../../../reducers/template/templateActions";
import {
  templateInitialState,
  templateReducer,
} from "../../../../reducers/template/templateReducer";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { FitScore } from "../../../ui/molecules";
import { Avatar } from "../../../ui/molecules/Avatar";
import { Rounded } from "../../../ui/molecules/Rounded";
import { ConnectionTabs } from "./ConnectionTabs";

export const ConnectionContext = React.createContext();

const ConnectionModal = ({
  currentConnection,
  currentTab,
  fetchConnections,
  setIsConnectionModalOpen,
  allowDisqualifiedConnection,
}) => {
  const { setCurrentCommentId } = useContext(ChildContext);
  const [alertsState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );
  const [attachmentState, attachmentDispatch] = useReducer(
    attachmentReducer,
    attachmentInitialState
  );
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    commentInitialState
  );
  const [templateState, templateDispatch] = useReducer(
    templateReducer,
    templateInitialState
  );
  const [children, setChildren] = useState([]);
  const [linkScore, setLinkScore] = useState({});

  const history = useHistory();

  useEffect(() => {
    console.log("Connected children: ", currentConnection);
    setCurrentCommentId(null);
    fetchTemplates();
    fetchComments();
    fetchAttachments();
    fetchAlerts();
    fetchChildren();
    fetchLinkScore();
  }, []);

  const fetchAlerts = () => {
    alertDispatch(fetchAlertsRequest());
    fetchConnectionsRequest({ id: currentConnection.id, view: "alerts" })
      .then((data) => {
        data && data.alerts && alertDispatch(fetchAlertsSuccess(data.alerts));
        console.log("=======================", data.alerts);
      })
      .catch((e) => e && alertDispatch(fetchAlertsFailure(e.message)));
  };

  const fetchAttachments = () => {
    attachmentDispatch(fetchAttachmentsRequest());
    fetchConnectionsRequest({ id: currentConnection.id, view: "attachments" })
      .then(
        (data) =>
          data &&
          data.attachments &&
          attachmentDispatch(
            fetchAttachmentsSuccess(connectionAttachmentsRow(data.attachments))
          )
      )
      .catch(
        (e) => e && attachmentDispatch(fetchAttachmentsFailure(e.message))
      );
  };

  const fetchChildren = () => {
    fetchConnectionsRequest({
      id: currentConnection.id,
      view: "children",
    }).then((data) => data && data.children && setChildren(data.children));
  };

  const fetchComments = () => {
    commentDispatch(fetchCommentsRequest());
    fetchConnectionsRequest({ id: currentConnection.id, view: "comments" })
      .then(
        (data) =>
          data &&
          data.comments &&
          commentDispatch(fetchCommentsSuccess(data.comments))
      )
      .catch((e) => e && commentDispatch(fetchCommentsFailure(e.message)));
  };

  const fetchTemplates = () => {
    templateDispatch(fetchTemplatesRequest());
    fetchConnectionsRequest({ id: currentConnection.id, view: "templates" })
      .then(
        (data) =>
          data &&
          data.templates &&
          templateDispatch(fetchTemplatesSuccess(data.templates))
      )
      .catch((e) => e && templateDispatch(fetchTemplatesFailure(e.message)));
  };

  const fetchLinkScore = () => {
    fetchConnectionsRequest({
      id: currentConnection.id,
      view: "link_score",
    }).then((data) => data && data.link_score && setLinkScore(data.link_score));
  };

  console.log("CURRENT CONNECTION", currentConnection);

  return (
    <ConnectionContext.Provider
      value={{
        alertsState,
        attachmentState,
        commentState,
        templateState,
        linkScore,
        currentConnection,
        fetchAlerts,
        fetchTemplates,
        fetchComments,
        fetchAttachments,
        fetchConnections,
        setIsConnectionModalOpen,
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          height: "80vh",
          width: 700,
        }}
      >
        <Box
          d="flex"
          style={{ justifyContent: "space-between", marginBottom: 20 }}
        >
          <Box d="f">
            <Box w="130px" d="flex" direction="column">
              <Avatar
                name={
                  currentConnection?.contact?.first_name +
                  currentConnection?.contact?.last_name
                }
                size="xlarge"
                ratio={1.25}
              />
            </Box>
            <Spacing m={{ t: "10px" }}>
              <Box d="flex" direction="column" align="flex-start">
                <Title
                  size="28px"
                  style={{
                    fontWeight: "700",
                    marginBottom: 10,
                  }}
                >
                  {currentConnection?.contact?.first_name}{" "}
                  {currentConnection?.contact?.last_name}
                </Title>
                {currentConnection.is_disqualified ? (
                  <Badge appearance="important">{"DISQUALIFIED"}</Badge>
                ) : null}
              </Box>
              <div style={{ marginBottom: 10 }}>
                <FitScore
                  score={
                    currentConnection.link_score_overall > 0
                      ? (5 * currentConnection.link_score_overall) / 100
                      : 0
                  }
                />
              </div>
              {currentConnection.is_disqualified ? (
                <Button
                  onClick={allowDisqualifiedConnection}
                  appearance="warning"
                >
                  Remove Disqualification
                </Button>
              ) : null}

              <Spacing m={{ t: "10px" }}>
                <Text style={{ fontSize: 15 }}>
                  {currentConnection?.contact?.relationship}
                </Text>
              </Spacing>
            </Spacing>
          </Box>
        </Box>
        <Title size="16px">Connected Children</Title>
        <Box d="flex" mt="8px">
          <ButtonGroup>
            {children.map((child) => (
              <Rounded
                onClick={() => history.push("../children/" + child.id)}
                content={
                  <>
                    <Avatar
                      size="small"
                      name={`${child.first_name} ${child.last_name}`}
                      isChild
                    />
                    <span style={{ marginLeft: "5px", color: "#455670" }}>
                      {child.first_name} {child.last_name}
                    </span>
                  </>
                }
              />
            ))}
          </ButtonGroup>
        </Box>
        <div style={{ marginTop: 15, marginRight: 50 }}>
          <ConnectionTabs
            currentConnection={currentConnection}
            currentTab={currentTab}
            setCurrentCommentId={setCurrentCommentId}
          />
        </div>
      </Box>
    </ConnectionContext.Provider>
  );
};
const Text = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #172b4d;
`;

export default ConnectionModal;
