import { useEffect, useContext, useState } from 'react';
import './style.css';
import FeedbackForm from './feedbackForm';
import CommentsList from './commentsList';
import { CommentsContext, Comment } from './commentsContext';


export default function App(): JSX.Element {
  const { dispatch } = useContext(CommentsContext);
  const [initialComments, setInitialComments] = useState<Comment[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  const fetchJSONData = () => {
    fetch('sample-data.json', 
      {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).then(response => {
      return response.json();
    }).then(data => {
      setInitialComments(data);
    }).catch((e: Error) => {
      console.log(e.message);
    });
  }

  useEffect(() => {
    fetchJSONData();
  },[]);

  useEffect(() => {
    if (initialComments.length > 0) {
      dispatch({type: 'RETRIEVE_COMMENTS', comments: initialComments});
    }
  }, [initialComments])

  return (
    <div>
      <div className="header">
        <div id="title">
          <h1>Gennev Community Page</h1>
        </div>
        <div id="spacer"/>
        <div id="searchInputDiv">
          <input
            value={searchInput}
            type="text"
            placeholder="Search..."
            onChange={e => {
              setSearchInput(e.target.value);
              dispatch({ type: 'FILTER_COMMENTS', searchTerm: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="pageContainer">
        <FeedbackForm />
        <CommentsList />
      </div>
    </div>
  );
}
