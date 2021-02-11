const Follow = require("../models/followModel");
const QueryFunctions = require("../utils/queryFunctions");

exports.getAllFollows = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.userId) {
      if (req.path === "/followings") {
        filter = { follower: req.params.userId };
      } else if (req.path === "/followers") {
        filter = { following: req.params.userId };
      } else {
        filter = {
          $or: [
            { follower: req.params.userId },
            { following: req.params.userId },
          ],
        };
      }
    }

    const queryObj = new QueryFunctions(Follow.find(filter), req.query)
      .filter(false)
      .sort()
      .select();

    const follows = await queryObj.query
      .populate("follower")
      .populate("following");

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
