import axios from "axios";
import config from "../../config";
import {
  COMMENTS_LOADING,
  GET_POST_COMMENTS,
  GET_USER_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../constants";
import catchErrors from "./catchErrors";

axios.defaults.withCredentials = true;

export const getPostComments = (postId) =>
  catchErrors(async (dispatch) => {
    dispatch({ type: COMMENTS_LOADING });
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/posts/${postId}/comments`
    );

    dispatch({ type: GET_POST_COMMENTS, payload: res.data });
  });

export const getUserComments = (userId) =>
  catchErrors(async (dispatch) => {
    dispatch({ type: COMMENTS_LOADING });
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/comments`
    );

    dispatch({ type: GET_USER_COMMENTS, payload: res.data });
  });

export const createComment = (comment) =>
  catchErrors(async (dispatch) => {
    const res = await axios.post(
      `${config.SERVER_URL}/api/v1/comments`,
      comment
    );

    dispatch({ type: CREATE_COMMENT, payload: res.data });
  });

export const deleteComment = (commentId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/comments/${commentId}`
    );

    dispatch({ type: DELETE_COMMENT, payload: commentId });
  });
