const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    unique: true,
    trim: true,
    maxlength: 20,
    minlength: 1,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
    minlength: 8,
  },
  avator: {
    type: String,
    trim: true,
    default: "avator.png",
  },
  info: {
    type: String,
    default: "This person is lazy.",
    maxlength: 100,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
