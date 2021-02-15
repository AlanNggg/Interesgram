import axios from "axios";
import config from "../../config";
import { GET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE } from "../constants";

axios.defaults.withCredentials = true;

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
