import {
  FOLLOWS_LOADING,
  GET_FOLLOWINGS,
  GET_FOLLOWERS,
  ADD_FOLLOWING,
  ADD_FOLLOWER,
  REMOVE_FOLLOWING,
  REMOVE_FOLLOWER,
} from "../constants";

const initialState = {
  followings: [],
  followers: [],
};

const follows = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOWS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_FOLLOWINGS:
      return {
        ...state,
        isLoading: false,
        followings: action.payload.data.follows,
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        isLoading: false,
        followers: action.payload.data.follows,
      };
    case ADD_FOLLOWING:
      return {
        ...state,
        followings: [...state.followings, action.payload.data.follow],
      };
    case REMOVE_FOLLOWING:
      return {
        ...state,
        followings: state.followings.filter(
          (following) => following.id !== action.payload
        ),
      };
    case ADD_FOLLOWER:
      return {
        ...state,
        followers: [...state.followers, action.payload.data.follow],
      };
    case REMOVE_FOLLOWER:
      return {
        ...state,
        followers: state.followers.filter(
          (follower) => follower.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default follows;
