import { GET_USERS, GET_USER } from "../constants";

const initialState = {
  users: [],
  selectedUser: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.data.users,
      };

    case GET_USER:
      return {
        ...state,
        selectedUser: action.payload.data.user,
      };
    default:
      return state;
  }
};

export default users;
