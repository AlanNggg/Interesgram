const Comment = require("../models/commentModel");
const QueryFunctions = require("../utils/queryFunctions");

exports.getAllComments = async (req, res) => {
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
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    let comment = await Comment.create(req.body);
    comment = await comment.populate("user").execPopulate();

    res.status(200).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        comment: null,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
