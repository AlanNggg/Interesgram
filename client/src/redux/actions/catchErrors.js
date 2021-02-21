import { GET_ERRORS } from "../constants";

const catchErrors = (fn) => {
  return (dispatch) => {
    fn(dispatch).catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.data.status,
      };
      dispatch({ type: GET_ERRORS, payload: errors });
    });
  };
};

export default catchErrors;
