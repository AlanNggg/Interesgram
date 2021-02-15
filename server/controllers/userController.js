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

exports.getCurrentUser = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const queryObj = new QueryFunctions(
      User.find().select("-email -passwordResetExpires -passwordResetToken"),
      req.query
    )
      .filter(true)
      .sort()
      .select();

    const users = await queryObj.query;

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.params.name })
      .populate("numPosts")
      .populate("numFollowers")
      .populate("numFollowings");

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let query = User.findById(req.params.id)
      .populate("numPosts")
      .populate("numFollowers")
      .populate("numFollowings");

    if (req.params.id !== req.user.id) {
      query = query.select("-email");
    }
    const user = await query;

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    let newUser = await User.create(req.body);

    newUser = await newUser
      .populate("numFollowers")
      .populate("numFollowings")
      .populate("numPosts")
      .execPopulate();

    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      return next(new error("This route is not for password updates!"));
    }

    if (req.file) req.body.avator = req.file.filename;

    console.log(req.body, req.file);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
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
    next(err);
  }
};
