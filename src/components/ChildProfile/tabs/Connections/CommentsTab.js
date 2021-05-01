import Comment, { CommentAuthor, CommentTime } from '@atlaskit/comment';
import moment from "moment";
import { useContext } from 'react';
import { humanReadableDateFormat } from '../../../../content/date';
import { Avatar } from '../../../ui/molecules/Avatar';
import { ConnectionContext } from './ConnectionModal';

export const CommentsTab = ({ setCurrentCommentId }) => {
  const { commentState: { comments }, setIsConnectionModalOpen } = useContext(ConnectionContext)

  const goToComment = (id) => {
    setIsConnectionModalOpen(false)
    setCurrentCommentId(id)
  }

  return (
    <div style={{ marginTop: "30px", width: "100%" }}>
      {
        comments.map(item => item && item.comment && (
          <div style={{ cursor: "pointer" }} onClick={() => goToComment(item.comment.id)}>
            <Comment
              avatar={<Avatar name={`${item.comment.user.first_name} ${item.comment.user.last_name}`}/>}
              author={<CommentAuthor href="/author">{item.comment.user.first_name} {item.comment.user.last_name}</CommentAuthor>}
              content={item.comment.body}
              time={<CommentTime>{moment(item.created_at).format(humanReadableDateFormat)}</CommentTime>}
            />
          </div>
        ))
      }
    </div>
  )
}