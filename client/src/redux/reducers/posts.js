import { GET_POSTS, CREATE_USER_POST, DELETE_USER_POST } from "../constants";

const initialState = {
  posts: [],
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case CREATE_USER_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case DELETE_USER_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
};
