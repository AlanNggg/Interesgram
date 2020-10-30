const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  postID: {
    type: mongoose.Types.ObjectId,
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
