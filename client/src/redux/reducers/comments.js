import {
  COMMENTS_LOADING,
  GET_POST_COMMENTS,
  GET_USER_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../constants";

const initialState = {
  comments: [],
};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POST_COMMENTS:
    case GET_USER_COMMENTS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload.data.comments,
      };

    case CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.data.comment],
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default comments;
