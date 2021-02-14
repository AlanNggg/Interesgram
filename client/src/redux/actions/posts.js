import axios from "axios";
import config from "../../config";
import {
  GET_POSTS,
  GET_USER_POSTS,
  CREATE_POST,
  DELETE_POST,
} from "../constants";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${config.SERVER_URL}/api/v1/posts`);

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsFromUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/posts`
    );

    dispatch({ type: GET_USER_POSTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/posts`, post);

    dispatch({ type: CREATE_POST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/posts/${postId}`
    );

    dispatch({ type: DELETE_POST, payload: postId });
  } catch (err) {
    console.log(err);
  }
};
