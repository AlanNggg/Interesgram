const Comment = require("../models/commentModel");
const QueryFunctions = require("../utils/queryFunctions");

exports.getAllComments = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.postId) {
      filter = { post: req.params.postId };
    } else if (req.params.userId) {
      filter = { user: req.params.userId };
    }

    // user ID, post ID, createdAt
    // filter() true: use Regex to find
    const queryObj = new QueryFunctions(Comment.find(filter), req.query)
      .filter(false)
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
    if (!req.body.post) req.body.post = req.params.postId;
    if (!req.body.user) req.body.user = req.user.id;

    const comment = await Comment.create(req.body);

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
