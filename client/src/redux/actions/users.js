import axios from "axios";
import config from "../../config";
import { GET_USERS, GET_USER } from "../constants";
import catchErrors from "./catchErrors";

axios.defaults.withCredentials = true;

export const getUsers = (username) =>
  catchErrors(async (dispatch) => {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users?name=${username}`
    );

    dispatch({ type: GET_USERS, payload: res.data });
  });

export const getUserByUsername = (username) =>
  catchErrors(async (dispatch) => {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/by/username/${username}`
    );

    dispatch({ type: GET_USER, payload: res.data });
  });
