import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
import { postCommentRequest } from "../../../../api/comments";
import { Box, Spacing } from "../../../ui/atoms";
import { Comments } from "./Comments";
import { CommentsForm } from "./CommentsForm";
import { useAuth } from "../../../../context/auth/authContext";
import { Avatar } from "../../../ui/molecules/Avatar";
import styled from "styled-components";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { CommentsProvider } from "./CommentsContext";
import { Facebook } from "react-content-loader";
import { useScrollPosition } from "./useScrollPosition";

const ContentLoader = () => <Facebook />;

const FooterForm = styled(Box)`
  display: flex;
  position: sticky;
  transform: ${(props) =>
    props.sticky ? "translateY(0)" : "translateY(100%)"};
  transition: transform 400ms ease-in;
  bottom: 0;
  left: 0;
  background-color: white;
  margin-bottom: -1em;
`;

const ScrollDown = styled.span``;

export const CommentsTab = ({ currentCommentId }) => {
  const {
    state,
    commentState: { comments, loading },
    fetchComments,
    setCurrentCommentId,
  } = useContext(ChildContext);
  const { id } = state.child;
  const [isExpanded, setIsExpanded] = useState(false);
  const [blocks, setBlocks] = useState(1);
  const [suggestions, setSuggestions] = useState(0);
  const { user } = useAuth();
  const scrollRef = useRef(null);
  const focusedComment = useRef(null);
  const commentId = useMemo(() => currentCommentId, []);
  const [sticky, setSticky] = useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      let reachedBottom =
        Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ) -
          (window.pageYOffset + window.innerHeight) <
        300;
      if (reachedBottom) setSticky(true);
      else {
        if (isShow !== sticky) setSticky(isShow);
      }
    },
    [sticky]
  );

  const executeScroll = () =>
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  const expandEditor = () => setIsExpanded(true);
  const collapseEditor = () => {
    setIsExpanded(false);
    setBlocks(1);
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

  useEffect(() => {
    if (isExpanded) executeScroll();
  }, [isExpanded]);

  useEffect(() => {
    comments?.sort(
      (a, b) =>
        (a.updated_at > a.created_at
          ? new Date(a.updated_at).getTime()
          : new Date(a.created_at).getTime()) -
        (b.updated_at > b.created_at
          ? new Date(b.updated_at).getTime()
          : new Date(b.created_at).getTime())
    );
    if (
      comments &&
      comments.length > 0 &&
      comments[comments.length - 1].in_reply_to === null &&
      comments[comments.length - 1].updated_at ===
        comments[comments.length - 1].created_at
    ) {
      executeScroll();
    }
  }, [comments]);

  return (
    <CommentsProvider>
      <Spacing m={{ b: "1em" }}>
        {!loading ? (
          <Spacing m={{ b: "22px" }}>
            {comments
              .filter((comment) => !comment.in_reply_to)
              .sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
              )
              .map((comment, index) => (
                <div
                  className={comment.id === commentId ? "animated" : null}
                  ref={comment.id === commentId ? focusedComment : null}
                  style={{
                    border: comment.id === commentId && "2px solid #eee",
                    padding: "8px 0",
                    width: "100%",
                  }}
                >
                  <Comments
                    childId={id}
                    data={comment}
                    key={comment.id}
                    refresh={fetchComments}
                    currentCommentId={currentCommentId}
                  />
                </div>
              ))}
          </Spacing>
        ) : (
          <Spacing m={{ b: "22px", t: "22px" }}>
            {comments.map(() => (
              <ContentLoader height={30} />
            ))}
          </Spacing>
        )}
        <ScrollDown ref={scrollRef} />
        <FooterForm sticky={sticky}>
          <Avatar name={`${user?.first_name} ${user?.last_name}`} />
          <Spacing m={{ l: "17px", t: "-31px" }}>
            <CommentsForm
              refresh={fetchComments}
              childId={id}
              inReply={0}
              setBlocks={setBlocks}
              isExpanded={isExpanded}
              collapseEditor={collapseEditor}
              expandEditor={expandEditor}
              onSubmit={postCommentRequest}
              setSuggestions={setSuggestions}
            />
          </Spacing>
        </FooterForm>
      </Spacing>
    </CommentsProvider>
  );
};
