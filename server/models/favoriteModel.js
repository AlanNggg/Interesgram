const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  postID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
