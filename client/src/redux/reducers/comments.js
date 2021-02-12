import {
  GET_POST_COMMENTS,
  GET_USER_COMMENTS,
  CREATE_USER_COMMENT,
  DELETE_USER_COMMENT,
} from "../constants";

const initialState = {
  comments: [],
};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    case GET_USER_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    case CREATE_USER_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case DELETE_USER_COMMENT:
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
