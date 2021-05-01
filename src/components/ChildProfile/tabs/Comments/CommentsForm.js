import React, { useState, useEffect } from "react";
import { Form, Box, Spacing } from "../../../ui/atoms";
import { FormSection } from "@atlaskit/form";
import Button from "@atlaskit/button";
import { WysiwygEditor } from "../../../WYSIWYG";
import styled from "styled-components";
import { useMentions } from "./CommentsContext";
import { TextInput } from "../../../ui/molecules";
import { createConnectionCommentsRequest } from "../../../../api/comments";

export const CommentsForm = ({
  onSubmit,
  childId,
  inReply,
  setShowReply,
  isExpanded,
  collapseEditor,
  expandEditor,
  setBlocks,
  initialValue,
  setEdit,
  userId,
  commentId,
  setSuggestions,
  refresh,
}) => {
  const [upd, setUpd] = useState(1);
  const [text, setText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [rawData, setRawData] = useState("");
  const { setPending } = useMentions();

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setPending(true);
    let check = new Set(text.split(""));
    if (check.size === 1 && check.values().next().value.charCodeAt(0) === 10)
      return -1;
    let mentionedUsers = [];
    let mentionedConnections = [];
    for (let key in rawData.entityMap) {
      if (rawData.entityMap[key].type === "mention") {
        mentionedUsers.push(rawData.entityMap[key].data.mention.id);
      }
      if (rawData.entityMap[key].type === "#mention") {
        mentionedConnections.push(rawData.entityMap[key].data.mention.id);
      }
    }

    onSubmit({
      comment: {
        html_body: htmlText,
        body: text,
        in_reply_to: inReply,
        child_id: childId,
        mentions: mentionedUsers,
        userId,
      },
      commentId,
    })
      .then((items) => {
        setUpd(upd + 1);
        console.log(items);
        mentionedConnections.map((id) =>
          createConnectionCommentsRequest(id, items.id)
        );
      })
      .finally(() => {
        refresh();
        setShowReply && setShowReply(false);
        setPending(false);
      });
  };

  return (
    <Form w="100%" onSubmit={onSubmitHandle} noValidate>
      <FormSection>
        {isExpanded ? (
          <>
            <Spacing m={{ l: "-10px" }}>
              <WysiwygEditor
                upd={upd}
                onChange={(tex, raw, html) => {
                  setText(tex);
                  console.log("RAW RAW: ", raw);
                  setRawData(raw);
                  setHtmlText(html);
                }}
                setBlocks={setBlocks}
                defaultValue={initialValue}
                setSuggestions={setSuggestions}
              />
              <StyledButtonGroup>
                <Button type="submit" appearance="primary">
                  Comment
                </Button>

                <Button
                  appearance="subtle"
                  onClick={() => {
                    collapseEditor();
                    setShowReply && setShowReply(false);
                    setEdit && setEdit(false);
                  }}
                >
                  Cancel
                </Button>
              </StyledButtonGroup>
            </Spacing>
          </>
        ) : (
          <TextInput
            width={400}
            onClick={expandEditor}
            placeholder="Add a comment..."
          />
        )}
      </FormSection>
    </Form>
  );
};

const StyledButtonGroup = styled(Box)`
  margin: 0 10px;
`;
