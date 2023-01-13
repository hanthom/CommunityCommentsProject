import { createContext, useReducer } from 'react';

export interface Comment {
  name: string;
  age: string;
  location: string;
  imageUrl: string;
  comment: string;
}

interface IAction {
  comments: Comment[];
  comment: Comment;
  searchTerm: string;
  type: 'RETRIEVE_COMMENTS' | 'ADD_COMMENT' | 'FILTER_COMMENTS';
}

const initialComments = {
  comments: [],
  filteredComments: [],
};

export const CommentsContext = createContext(null);

const commentsReducer = (state, action: IAction) => {
  console.log('action', action);
  switch (action.type) {
    case 'RETRIEVE_COMMENTS':
      return {
        ...state,
        comments: action.comments,
        filteredComments: action.comments,
      };
    case 'ADD_COMMENT':
      const updatedCommentArray = [...state.comments, action.comment]
      return {
        ...state,
        comments: updatedCommentArray,
        filteredComments: updatedCommentArray,
      };
    case 'FILTER_COMMENTS':
      if (action.searchTerm === '') {
        console.log('if', action.searchTerm);
        return {
          ...state,
          filteredComments: state.comments,
        }
      } else {
        // This ideally would not be this way. 
        const filteredComments = state.comments.filter((entry: Comment) => {
          return Object.values(entry).some((value: string) => value.toLowerCase().includes(action.searchTerm.toLowerCase()));
        });
        return {
          ...state,
          filteredComments,
        }
      }
    default:
      return state;
  }
}

const CommentsProvider = ({ children }) =>{
  const [state, dispatch] = useReducer(
    commentsReducer,
    initialComments,
  );

  return (
    <CommentsContext.Provider value={{state, dispatch}}>
        {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;
