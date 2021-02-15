import axios from "axios";
import config from "../../config";
import {
  GET_POST_COMMENTS,
  GET_USER_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../constants";

axios.defaults.withCredentials = true;

export const getPostComments = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/posts/${postId}/comments`
    );

    dispatch({ type: GET_POST_COMMENTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getUserComments = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/comments`
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

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/comments/${commentId}`
    );

    dispatch({ type: DELETE_COMMENT, payload: commentId });
  } catch (err) {
    console.log(err);
  }
};
