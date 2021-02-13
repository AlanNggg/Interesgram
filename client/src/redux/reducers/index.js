import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import posts from "./posts";
import comments from "./comments";
import follows from "./follows";
import favorites from "./favorites";
import messages from "./messages";
import errors from "./errors";

export default combineReducers({
  auth,
  users,
  posts,
  comments,
  follows,
  favorites,
  messages,
  errors,
});