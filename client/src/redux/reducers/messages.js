import { CREATE_MESSAGE, REMOVE_MESSAGE } from "../constants";

const initialState = {};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    case REMOVE_MESSAGE:
      return (state = null);
    default:
      return state;
  }
};

export default messages;
