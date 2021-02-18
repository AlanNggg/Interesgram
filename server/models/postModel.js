const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Virtual populate
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

postSchema.virtual("numLikes", {
  ref: "Favorite",
  foreignField: "post",
  localField: "_id",
  count: true,
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select:
      "-email -passwordChangedAt -passwordResetExpires -passwordResetToken",
  });

  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
