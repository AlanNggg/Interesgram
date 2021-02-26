import { CREATE_MESSAGE, REMOVE_MESSAGE, GET_ERRORS } from "../constants";

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};
export const removeMessage = () => {
  return {
    type: REMOVE_MESSAGE,
  };
};

export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};
