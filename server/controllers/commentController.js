const Comment = require("../models/commentModel");

exports.getAllComments = async (req, res) => {
  try {
    // user ID, post ID, createdAt
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const modifiedQueryObj = Object.assign(
      {},
      ...Object.keys(queryObj).map((key) => {
        if (key === "userID" || key === "postID")
          return { [key]: queryObj[key] };

        const regex = new RegExp(queryObj[key], "i");
        const el = {
          [key]: {
            $regex: regex,
          },
        };
        return el;
      })
    );

    let query = Comment.find(queryObj);

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query.skip(skip).limit(limit);

    if (req.query.sort) {
      const sort = req.query.sort.replace(/,/g, " ");
      query = query.sort(sort);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      // e.g. user ID, postID, comment
      const fields = req.query.fields.replace(/,/g, " ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const comments = await query;

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
