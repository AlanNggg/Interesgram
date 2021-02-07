const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// favoriteSchema.index({ user: 1, post: 1 }, { unique: true });

favoriteSchema.pre(/^find/, function (next) {
  this.populate({
    path: "post",
    select: "-__v",
  });
  next();
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
