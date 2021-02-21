import axios from "axios";
import config from "../../config";
import {
  GET_FOLLOWINGS,
  GET_FOLLOWERS,
  ADD_FOLLOWING,
  ADD_FOLLOWER,
  REMOVE_FOLLOWING,
  REMOVE_FOLLOWER,
} from "../constants";
import catchErrors from "./catchErrors";

axios.defaults.withCredentials = true;

export const getFollowings = (userId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/follows/followings`
    );

    dispatch({ type: GET_FOLLOWINGS, payload: res.data });
  });

export const getFollowers = (userId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/users/${userId}/follows/followers`
    );

    dispatch({ type: GET_FOLLOWERS, payload: res.data });
  });

export const addFollowing = (userId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/follows`, {
      following: userId,
    });

    dispatch({ type: ADD_FOLLOWING, payload: res.data });
  });

export const removeFollowing = (followId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/follows/${followId}`
    );

    dispatch({ type: REMOVE_FOLLOWING, payload: followId });
  });

export const addFollower = (userId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.post(`${config.SERVER_URL}/api/v1/follows`, {
      following: userId,
    });

    dispatch({ type: ADD_FOLLOWER, payload: res.data });
  });

export const removeFollower = (followId) =>
  catchErrors(async (dispatch) => {
    const res = await axios.delete(
      `${config.SERVER_URL}/api/v1/follows/${followId}`
    );

    dispatch({ type: REMOVE_FOLLOWER, payload: followId });
  });
