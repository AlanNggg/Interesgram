const Follow = require("../models/followModel");
const QueryFunctions = require("../utils/queryFunctions");
const error = require("../utils/CustomError");

exports.getAllFollows = async (req, res, next) => {
  try {
    let query = Follow.find();
    let filter = {};
    if (req.params.userId) {
      if (req.path === "/followings") {
        filter = { follower: req.params.userId };
        query = query.populate("following").select("-follower");
      } else if (req.path === "/followers") {
        filter = { following: req.params.userId };
        query = query.populate("follower").select("-following");
      } else {
        filter = {
          $or: [
            { follower: req.params.userId },
            { following: req.params.userId },
          ],
        };
      }
    }
    query = query.find(filter);

    const queryObj = new QueryFunctions(query, req.query)
      .filter(false)
      .sort()
      .select();

    const follows = await queryObj.query;

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
    const follow = await Follow.create({
      follower: req.user.id,
      following: req.body.following,
    });

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
      return next(new error("No document found with that ID", 404));
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
