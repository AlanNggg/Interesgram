import { GET_USERS } from "../constants";

const initialState = {
  users: [],
  userLoaded: 0,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [...state.users, action.payload],
        userLoaded: state.userLoaded + 1,
      };

    default:
      return state;
  }
};

export default users;
