import { GET_USERS, GET_USER } from "../constants";

const initialState = {
  users: [],
  selectedUser: null,
  userLoaded: 0,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [...state.users, action.payload.data.users],
        userLoaded: state.userLoaded + 1,
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
