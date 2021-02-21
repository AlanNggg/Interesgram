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
import catchErrors from "./catchErrors";

axios.defaults.withCredentials = true;

export const getPosts = () =>
  catchErrors(async (dispatch) => {
    const res = await axios.get(`${config.SERVER_URL}/api/v1/posts`);

    dispatch({ type: GET_POSTS, payload: res.data });
  });

export const getPostsFromUser = (userId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/posts`
    );

    dispatch({ type: GET_USER_POSTS, payload: res.data });
  });

export const getPost = (postId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.get(`${config.SERVER_URL}/api/v1/posts/${postId}`);

    dispatch({ type: GET_POST, payload: res.data });
  });

export const createPost = (post) =>
  catchErrors(async (dispatch) => {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/posts`, post);

    dispatch({ type: CREATE_POST, payload: res.data });
  });

export const deletePost = (postId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/posts/${postId}`
    );

    dispatch({ type: DELETE_POST, payload: postId });
  });

export const getFavorites = (userId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/favorites`
    );

    dispatch({ type: GET_FAVORITES, payload: res.data });
  });

export const addFavorite = (postId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/favorites`, {
      post: postId,
    });

    dispatch({ type: ADD_FAVORITE, payload: res.data });
  });

export const removeFavorite = (favoriteId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/favorites/${favoriteId}`
    );

    dispatch({ type: REMOVE_FAVORITE, payload: favoriteId });
  });

// Get users who like the post
export const getPostLikes = (postId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/posts/${postId}/favorites`
    );

    dispatch({ type: GET_POST_LIKES, payload: res.data });
  });

export const addLike = (postId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/favorites`, {
      post: postId,
    });

    dispatch({ type: ADD_LIKE, payload: res.data });
  });

export const removeLike = (likeId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/favorites/${likeId}`
    );

    dispatch({ type: REMOVE_LIKE, payload: likeId });
  });
