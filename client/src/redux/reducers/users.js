import { GET_USERS, GET_USER, USERS_LOADING } from "../constants";

const initialState = {
  users: [],
  selectedUser: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.data.users,
      };

    case GET_USER:
      return {
        ...state,
        isLoading: false,
        selectedUser: action.payload.data.user,
      };
    default:
      return state;
  }
};

export default users;
