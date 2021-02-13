import axios from "axios";
import { GET_USERS } from "../constants";
import config from "../../config";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${config.SERVER_URL}/api/v1/users`);

    dispatch({ type: GET_USERS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
