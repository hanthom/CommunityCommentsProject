import { useContext } from 'react';
import { CommentsContext, Comment } from './commentsContext';
import './style.css';

const CommentBox = ({comment} : {comment: Comment}) => {
  return (
    <div id="commentContainer" key={comment.name}>
      <div className="thumbnail">
        <img id="image" src={comment.imageUrl} />
      </div>
      <div className="comment">
        <p>"{comment.comment}"</p>
      </div>
    </div>
  )
}

export default function CommentsList(): JSX.Element {
  const { state } = useContext(CommentsContext);
  const { filteredComments } = state;

  if (filteredComments.length === 0) {
    return (
      <div></div>
    )
  }
  return (
    <div className="listContainer">
      {filteredComments.map((comment: Comment) => {
        return (
          <CommentBox comment={comment} />
        );
      })}
    </div>
  )
}