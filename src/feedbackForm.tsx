import { useContext, useState, useEffect } from 'react';
import { CommentsContext, Comment } from './commentsContext';

const blankComment: Comment = {
  name: '',
  age: '',
  location: '',
  imageUrl: '',
  comment: '',
}

export default function FeedbackForm(): JSX.Element {
  const { state, dispatch } = useContext(CommentsContext);
  const {comments } = state;
  const [comment, setComment] = useState<Comment>(blankComment);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [nameExists, setNameExists] = useState<boolean>(false);

  const validateNameCheck = (name: string) => {
    if (comments.some((entry: Comment) => entry.name === name)) {
      setNameExists(true);
    } else {
      setNameExists(false);
    }
    setComment({...comment, name});
  }

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'ADD_COMMENT', comment }); 
    setComment(blankComment);
    setButtonDisabled(true);
  };

  useEffect(() => {
    if (Object.values(comment).every(item => item) && !nameExists) {
      setButtonDisabled(false);
    }
  }, [comment])

  return (
    <div id="formContainer">
      <h2>Add Your Voice</h2>
      {nameExists && (<p className="warningText">You have already left a comment.</p>)}
      <form id="form" onSubmit={handleCommentSubmit}>
        <input
          className="formInput"
          value={comment.name}
          name="name"
          placeholder="Name"
          onChange={e => validateNameCheck(e.target.value)}
        />
        <input
          className="formInput"
          value={comment.age}
          name="age"
          placeholder="Age"
          onChange={e => setComment({...comment, age: e.target.value})}
        />
        <input
          className="formInput"
          value={comment.location}
          name="location"
          placeholder="Location"
          onChange={e => setComment({...comment, location: e.target.value})}
        />
        <input
          className="formInput"
          value={comment.imageUrl}
          name="imageURL"
          placeholder="Image Link"
          onChange={e => setComment({...comment, imageUrl: e.target.value})}
        />
        <textarea
          id="textAreaForm"
          value={comment.comment}
          name="comment"
          placeholder="Please write your comments here..."
          onChange={e => setComment({...comment, comment: e.target.value})}
        />
        <button disabled={buttonDisabled} type="submit">Submit</button>
      </form>
    </div>
  )
}