import axios from "axios";
import config from "../../config";
import { GET_USERS, GET_USER } from "../constants";
import catchErrors from "./catchErrors";

axios.defaults.withCredentials = true;

export const dispatchHelper = (type, url, data) => {
  return catchErrors(async (dispatch) => {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/${url}`, data);
    dispatch({ type, payload: res.data });
  });
};
