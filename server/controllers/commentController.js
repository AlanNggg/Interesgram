const Comment = require("../models/commentModel");
const QueryFunctions = require("../utils/queryFunctions");

exports.getAllComments = async (req, res, next) => {
  try {
    // user ID, post ID, createdAt
    // filter() true: use Regex to find
    const queryObj = new QueryFunctions(Comment.find(), req.query)
      .filter(false)
      .sort()
      .select();

    const comments = await queryObj.query.populate("user");

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new error("No comment found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      user: req.user.id,
      post: req.body.post,
      comment: req.body.comment,
    });

    res.status(200).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        comment: null,
      },
    });
  } catch (err) {
    next(err);
  }
};
