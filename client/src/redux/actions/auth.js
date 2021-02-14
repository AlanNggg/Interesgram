import axios from "axios";
import config from "../../config";

import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
} from "../constants";

export const getCurrentUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/currentUser`
    );

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const login = (email, password) => async (dispatch) => {
  const setting = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      `${config.SERVER_URL}/api/v1/users/login`,
      body,
      setting
    );

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const signUp = ({ name, email, password, passwordConfirm }) => async (
  dispatch
) => {
  const setting = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, passwordConfirm });

  try {
    const res = await axios.post(
      `${config.SERVER_URL}/api/v1/users/signup`,
      body,
      setting
    );

    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: SIGNUP_FAIL });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};
