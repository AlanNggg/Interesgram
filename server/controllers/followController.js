const Follow = require("../models/followModel");
const QueryFunctions = require("../utils/queryFunctions");

exports.getAllFollows = async (req, res) => {
  try {
    // followerID / followingID
    const queryObj = new QueryFunctions(Follow.find(), req.query)
      .filter()
      .sort()
      .select()
      .paginate();

    const follows = await queryObj.query;

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
