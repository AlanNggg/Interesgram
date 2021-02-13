import axios from "axios";
import {
  GET_POSTS,
  GET_USER_POSTS,
  CREATE_POST,
  DELETE_POST,
} from "../constants";
import config from "../../config";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${config.SERVER_URL}/api/v1/posts`);

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsFromUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${id}/posts`
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

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${config.SERVER_URL}/api/v1/posts/${id}`);

    dispatch({ type: DELETE_POST, payload: id });
  } catch (err) {
    console.log(err);
  }
};
