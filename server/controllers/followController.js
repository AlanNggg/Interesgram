const Follow = require("../models/followModel");
const QueryFunctions = require("../utils/queryFunctions");

exports.getFollows = async (req, res, next) => {
  try {
    console.log(req.query);
    const queryObj = new QueryFunctions(Follow.find(), req.query)
      .filter(false)
      .sort()
      .select();

    const follows = await queryObj.query
      .populate("follower")
      .populate("following");

    console.log(follows);
    res.status(200).json({
      status: "success",
      data: {
        follows,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.addFollow = async (req, res, next) => {
  try {
    const follow = await Follow.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        follow,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.removeFollow = async (req, res, next) => {
  try {
    const follow = await Follow.findByIdAndDelete(req.params.id);

    if (!follow) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        follow: null,
      },
    });
  } catch (err) {
    next(err);
  }
};
