import {
  GET_POSTS,
  GET_USER_POSTS,
  CREATE_POST,
  DELETE_POST,
} from "../constants";

const initialState = {
  posts: [],
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
    case GET_USER_POSTS:
      return {
        ...state,
        posts: action.payload.data.posts,
      };

    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload.data.post],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
};

export default posts;
