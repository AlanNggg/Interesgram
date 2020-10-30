const Follow = require("../models/followModel");

exports.getAllFollows = async (req, res) => {
  try {
    // follower ID, following ID, createdAt
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];

    excludedFields.forEach((el) => delete queryObj[el]);

    // queryObj e.g. followerID / followingID
    let query = Follow.find(queryObj);

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.sort) {
      const sort = req.query.sort.replace(/,/g, " ");
      query = query.sort(sort);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      // e.g. your followers/your followings
      const fields = req.query.fields.replace(/,/g, " ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const follows = await query;

    res.status(200).json({
      status: "success",
      data: {
        follows,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.addFollow = async (req, res) => {
  try {
    const newFollow = await Follow.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        follow: newFollow,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.removeFollow = async (req, res) => {
  try {
    await Follow.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        post: null,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
