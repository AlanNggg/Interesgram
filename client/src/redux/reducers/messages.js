import { CREATE_MESSAGE } from "../constants";

const initialState = {};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
};

export default messages;
