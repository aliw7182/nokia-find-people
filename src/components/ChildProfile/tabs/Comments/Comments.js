import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import styled from "styled-components";
import { Box, Spacing, Title } from "../../../ui/atoms";
import Button, { ButtonGroup } from "@atlaskit/button";
import { CommentsForm } from "./CommentsForm";
import { useClickOutside } from "../../../../hooks/index";
import {
  postCommentRequest,
  updateCommentRequest,
  deleteCommentRequest,
} from "../../../../api/comments";
import { Avatar } from "../../../ui/molecules/Avatar";
import { useAuth } from "../../../../context/auth/authContext";
import { ModalDialog } from "../../../ui/common";
import { useMentions } from "./CommentsContext";
import moment from "moment";
import { ChildContext } from "../../../../pages/ChildProfilePage";

export const Comments = ({ data, childId, refresh, currentCommentId }) => {
  const { setCurrentCommentId } = useContext(ChildContext);
  const [showReply, setShowReply] = useState(false);
  const [body, setBody] = useState(data.html_body ? data.html_body : data.body);
  const [isExpanded, setIsExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialValue, setInitialValue] = useState("");
  const { user } = useAuth();

  const expandEditor = () => setIsExpanded(true);
  const focusedComment = useRef(null);
  const commentId = useMemo(() => currentCommentId, []);
  const collapseEditor = () => {
    setShowReply(false);
    setIsExpanded(false);
  };

  useEffect(() => {
    if (focusedComment?.current) {
      focusedComment.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setCurrentCommentId(null);
    }
  }, []);

  // console.log(data);
  useEffect(() => {
    let comment = body;
    let ij = [];
    for (let i = 0; i < comment.length; i++) {
      if (
        (i === 0 && comment[i] === "@") ||
        (comment[i] === "@" && comment[i - 1] === " ") ||
        (comment[i] === "@" && comment[i - 1] === ">") ||
        (i === 0 && comment[i] === "#") ||
        (comment[i] === "#" && comment[i - 1] === " ") ||
        (comment[i] === "#" && comment[i - 1] === ">")
      ) {
        let j,
          s = 0;
        for (j = 1; j + i < comment.length && s !== 2; j++) {
          // find last index of mention
          if (comment[i + j] === " " || comment[i + j + 1] === "&") s++;
        }
        ij.push([i, i + j]);
      }
    }
    let res = [];
    let last = 0;
    if (ij.length > 0) {
      for (let i = 0; i < ij.length; i++) {
        // for mention highlight
        res.push(comment.substring(last, ij[i][0]));
        res.push(`<a style="
        cursor:pointer;
        color:#0052CC;
        text-decoration:none;
        font:14px Helvetica;
        a:hover {text-decoration:underline;};
        ">
          ${comment.substring(ij[i][0], ij[i][1])}
        </a>`);
        last = ij[i][1];
      }
      let end = comment.substring(last);
      comment = "";
      res.forEach((item) => (comment += item));
      comment += end;
    }
    // console.log(comment);
    setBody(comment);
  }, [edit]);

  const onDelete = () => {
    deleteCommentRequest({ commentId: data.id })
      .then(() => {})
      .finally(() => {
        setModalOpen(false);
        refresh();
      });
  };

  const onEdit = async (e) => {
    await updateCommentRequest(e)
      .then((items) => {
        setBody(items.html_body);
      })
      .finally(() => {
        setEdit(!edit);
      });
  };

  const time = () => {
    let duration = moment(data.created_at).fromNow();
    if (
      moment().subtract(31, "days").valueOf() >
      moment(data.created_at).valueOf()
    ) {
      return `on ${moment(data.created_at).format("ll")}`;
    } else {
      return duration;
    }
  };

  return (
    <Spacing>
      <Box d="flex">
        <Avatar name={`${data.user.first_name} ${data.user.last_name}`} />
        <Spacing m={{ l: "7px" }}>
          <Box d="flex">
            <Title
              size="14px"
              style={{ marginRight: "5px" }}
            >{`${data.user.first_name} ${data.user.last_name}`}</Title>
            <Text
              style={{ color: "#586069", lineHeight: "24px" }}
              size="14px"
            >{`commented ${time()}`}</Text>
          </Box>
          {edit ? (
            <Spacing m={{ t: "-22px" }}>
              <CommentsForm
                key={data.id}
                childid={childId}
                userId={data.user.id}
                commentId={data.id}
                initialValue={initialValue}
                refresh={refresh}
                setEdit={setEdit}
                inReply={data.in_reply_to?.id}
                onSubmit={onEdit}
                setShowReply={setShowReply}
                isExpanded={isExpanded}
                collapseEditor={collapseEditor}
                expandEditor={expandEditor}
              />
            </Spacing>
          ) : (
            <>
              <Text dangerouslySetInnerHTML={{ __html: body }}></Text>
              {showReply ? (
                <>
                  <Spacing m={{ t: "17px" }}>
                    <Box d="flex">
                      <Avatar name={`${user.first_name} ${user.last_name}`} />
                      <Spacing m={{ l: "10px" }}>
                        <Title
                          size="14px"
                          style={{ marginRight: "5px" }}
                        >{`${user.first_name} ${user.last_name}`}</Title>
                        <Spacing m={{ t: "-22px" }}>
                          <CommentsForm
                            key={data.id}
                            refresh={refresh}
                            childId={childId}
                            inReply={data.id}
                            setEdit={setEdit}
                            onSubmit={postCommentRequest}
                            setShowReply={setShowReply}
                            isExpanded={isExpanded}
                            collapseEditor={collapseEditor}
                            expandEditor={expandEditor}
                          />
                        </Spacing>
                      </Spacing>
                    </Box>
                  </Spacing>
                </>
              ) : (
                <ButtonGroup>
                  <Button
                    appearance="link"
                    onClick={() => setShowReply(true)}
                    style={{ padding: "0px" }}
                  >
                    <ButtonContentWrapper>Reply</ButtonContentWrapper>
                  </Button>{" "}
                  <Button
                    appearance="link"
                    onClick={() => {
                      setEdit(true);
                      setInitialValue(body);
                      setIsExpanded(true);
                    }}
                    style={{ padding: "0px" }}
                    isDisabled={data.user.id !== user?.id}
                  >
                    <ButtonContentWrapper>Edit</ButtonContentWrapper>
                  </Button>{" "}
                  <Button
                    appearance="link"
                    onClick={() => setModalOpen(true)}
                    style={{ padding: "0px" }}
                    isDisabled={data.user.id !== user?.id}
                  >
                    <ButtonContentWrapper>Delete</ButtonContentWrapper>
                  </Button>
                </ButtonGroup>
              )}
            </>
          )}

          {data.replies.map((reply) => (
            <div
              className={reply.id === commentId ? "animated" : null}
              ref={reply.id === commentId ? focusedComment : null}
              style={{
                width: "100vh",
                margin: 0,
                border: reply.id === commentId && "2px solid #eee",
                padding: "8px 0",
              }}
            >
              <Comments
                childId={childId}
                refresh={refresh}
                key={data.id}
                data={reply}
                currentCommentId={currentCommentId}
              />
            </div>
          ))}

          <ModalDialog
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            onClick={onDelete}
            positiveLabel="Delete"
            heading="Are you sure you want to remove this comment?"
            body="You will no longer have access to this comment's content"
            appearance="danger"
          />
        </Spacing>
      </Box>
    </Spacing>
  );
};

const ButtonContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;

const Text = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #172b4d;
`;
