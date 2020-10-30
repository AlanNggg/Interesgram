const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
