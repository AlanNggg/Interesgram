import axios from "axios";
import config from "../../config";
import {
  GET_POSTS,
  GET_USER_POSTS,
  GET_POST,
  CREATE_POST,
  DELETE_POST,
  GET_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  GET_POST_LIKES,
  ADD_LIKE,
  REMOVE_LIKE,
} from "../constants";

axios.defaults.withCredentials = true;

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

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`${config.SERVER_URL}/api/v1/posts/${postId}`);

    dispatch({ type: GET_POST, payload: res.data });
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

export const getFavorites = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/favorites`
    );

    dispatch({ type: GET_FAVORITES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const addFavorite = (postId) => async (dispatch) => {
  try {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/favorites`, {
      post: postId,
    });

    dispatch({ type: ADD_FAVORITE, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const removeFavorite = (favoriteId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/favorites/${favoriteId}`
    );

    dispatch({ type: REMOVE_FAVORITE, payload: favoriteId });
  } catch (err) {
    console.log(err);
  }
};

// Get users who like the post
export const getPostLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/posts/${postId}/favorites`
    );

    dispatch({ type: GET_POST_LIKES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/favorites`, {
      post: postId,
    });

    dispatch({ type: ADD_LIKE, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const removeLike = (likeId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/favorites/${likeId}`
    );

    dispatch({ type: REMOVE_LIKE, payload: likeId });
  } catch (err) {
    console.log(err);
  }
};
