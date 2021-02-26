import {
  POSTS_LOADING,
  GET_POST,
  GET_POSTS,
  GET_USER_POSTS,
  CREATE_POST,
  DELETE_POST,
  GET_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  GET_POST_LIKES,
  ADD_LIKE,
  REMOVE_LIKE,
} from "../constants";

const initialState = {
  posts: [],
  favorites: [],
  likes: [],
  selectedPost: null,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS:
    case GET_USER_POSTS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload.data.posts,
      };

    case GET_POST:
      return {
        ...state,
        isLoading: false,
        selectedPost: action.payload.data.post,
      };

    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload.data.post, ...state.posts],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload.data.favorites,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [action.payload.data.favorite, ...state.favorites],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.payload
        ),
      };
    case GET_POST_LIKES:
      return {
        ...state,
        likes: action.payload.data.favorites,
      };
    case ADD_LIKE:
      return {
        ...state,
        likes: [action.payload.data.favorite, ...state.likes],
      };
    case REMOVE_LIKE:
      return {
        ...state,
        likes: state.likes.filter((like) => like.id !== action.payload),
      };
    default:
      return state;
  }
};

export default posts;
