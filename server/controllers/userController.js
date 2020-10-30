const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    // name only
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];

    excludedFields.forEach((el) => delete queryObj[el]);

    // using regex to search if a field contains that value
    const modifiedQueryObj = Object.assign(
      {},
      // spread operator for array =>
      ...Object.keys(queryObj).map((key) => {
        const regex = new RegExp(queryObj[key], "i");
        const el = {
          [key]: {
            $regex: regex,
          },
        };
        return el;
      })
    );

    let query = User.find(modifiedQueryObj);

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.sort) {
      // name
      const sort = req.query.sort.replace(/,/g, " ");
      query = query.sort(sort);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      // e.g. name, avator, info
      const fields = req.query.fields.replace(/,/g, " ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const users = await query;

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      // return new one
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
