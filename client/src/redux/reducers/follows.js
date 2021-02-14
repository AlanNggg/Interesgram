import {
  GET_FOLLOWINGS,
  GET_FOLLOWERS,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
  REMOVE_FOLLOWER,
} from "../constants";

const initialState = {
  followings: [],
  followers: [],
};

const follows = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWINGS:
      console.log(action.payload.data.follows);
      return {
        ...state,
        followings: action.payload.data.follows,
      };
    case GET_FOLLOWERS:
      return {
        ...state,
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
          (following) => following.id !== action.payload.data.follow.id
        ),
      };
    case REMOVE_FOLLOWER:
      return {
        ...state,
        followers: state.followers.filter(
          (follower) => follower.id !== action.payload.data.follow.id
        ),
      };
    default:
      return state;
  }
};

export default follows;
