const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
  follower: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  following: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// followSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "follower",
//     select: "name avator info",
//   }).populate({
//     path: "following",
//     select: "name avator info",
//   });

//   next();
// });

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
