import axios from "axios";
import config from "../../config";
import { GET_USERS, GET_USER } from "../constants";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${config.SERVER_URL}/api/v1/users`);

    dispatch({ type: GET_USERS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getUserByUsername = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/by/username/${username}`,
      {
        withCredentials: true,
      }
    );
    console.log(res);
    dispatch({ type: GET_USER, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
