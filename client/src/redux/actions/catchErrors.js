import { GET_ERRORS } from "../constants";

const catchErrors = (fn) => {
  return async (dispatch) => {
    try {
      await fn(dispatch);
    } catch (err) {
      console.log(err);
      const errors = {
        msg: err.response.data,
        status: err.response.data.status,
      };
      dispatch({ type: GET_ERRORS, payload: errors });
    }
  };
};

export default catchErrors;
