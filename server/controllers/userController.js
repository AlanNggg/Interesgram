const multer = require("multer");
const sharp = require("sharp");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const QueryFunctions = require("../utils/queryFunctions");
const error = require("../utils/CustomError");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "/uploads/img/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// Convert image to buffer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new error("Please upload images!", 400), false);
  }
};

const upload = multer({
  // dest: "/uploads/img/users"
  storage,
  fileFilter,
});

exports.uploadAvator = upload.single("avator");

exports.resizeAvator = async (req, res, next) => {
  if (!req.file) return next();

  // define filename as using buffer
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // resize to square image and return a promise
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/img/users/${req.file.filename}`);

  next();
};

exports.getAllUsers = async (req, res) => {
  try {
    const queryObj = new QueryFunctions(User.find(), req.query)
      .filter(true)
      .sort()
      .select();

    const users = await queryObj.query
      .populate("followers")
      .populate("following")
      .populate("posts");

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
    const user = await User.findOne({ name: req.params.name })
      .populate("followers")
      .populate("following")
      .populate("posts");

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

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers")
      .populate("following")
      .populate("posts");

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
    if (req.file) req.body.avator = req.file.filename;
    console.log(req.body);
    console.log(req.body, req.file);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      // return new one
      new: true,
      runValidators: true,
    })
      .populate("followers")
      .populate("following")
      .populate("posts");

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
