const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.post("save", async function (doc, next) {
  // Call the populate on a DOC NEED TO CALL execPopulate
  await doc
    .populate({
      path: "post",
      select: "-__v",
    })
    .populate({
      path: "user",
      select: "-email -passwordChangedAt",
    })
    .execPopulate();
  next();
});

commentSchema.pre(/^find/, function (next) {
  this.select("-__v").populate("user");

  next();
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
