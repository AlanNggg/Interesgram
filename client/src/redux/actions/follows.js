import axios from "axios";
import config from "../../config";
import {
  GET_FOLLOWINGS,
  GET_FOLLOWERS,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
  REMOVE_FOLLOWER,
} from "../constants";

export const getFollowings = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/follows/followings`
    );

    dispatch({ type: GET_FOLLOWINGS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getFollowers = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/follows/followers`
    );

    dispatch({ type: GET_FOLLOWERS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const addFollowing = (userId) => async (dispatch) => {
  try {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/follows`, {
      following: userId,
    });

    dispatch({ type: ADD_FOLLOWING, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const removeFollowing = (followId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/follows/${followId}`
    );

    dispatch({ type: REMOVE_FOLLOWING, payload: followId });
  } catch (err) {
    console.log(err);
  }
};

export const removeFollower = (followId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/follows/${followId}`
    );

    dispatch({ type: REMOVE_FOLLOWER, payload: followId });
  } catch (err) {
    console.log(err);
  }
};
