import axios from "axios";

import {
  GET_POST_COMMENTS,
  GET_USER_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../constants";

export const getPostComments = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/posts/${id}/comments`
    );

    dispatch({ type: GET_POST_COMMENTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getUserComments = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${id}/comments`
    );

    dispatch({ type: GET_USER_COMMENTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const createComment = (comment) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${config.SERVER_URL}/api/v1/comments`,
      comment
    );

    dispatch({ type: CREATE_COMMENT, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/comments/${id}`
    );

    dispatch({ type: DELETE_COMMENT, payload: id });
  } catch (err) {
    console.log(err);
  }
};
