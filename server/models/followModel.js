const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
  followerID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  followingID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
