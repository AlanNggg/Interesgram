const Comment = require("../models/commentModel");
const QueryFunctions = require("../utils/queryFunctions");

exports.getAllComments = async (req, res) => {
  try {
    // user ID, post ID, createdAt
    // filter() true: use Regex to find
    const queryObj = new QueryFunctions(Comment.find(), req.query)
      .filter(true)
      .sort()
      .select()
      .paginate();

    const comments = await queryObj.query;

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
    const newComment = await Comment.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        comment: newComment,
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
