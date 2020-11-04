const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    maxlength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
