import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
} from "../constants";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.data.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case SIGNUP_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
