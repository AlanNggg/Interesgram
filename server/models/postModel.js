const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: [String],
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
