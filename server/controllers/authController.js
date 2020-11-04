const User = require("../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const error = require("../utils/CustomError");

const createToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
      .populate("followers")
      .populate("following")
      .populate("posts");

    createToken(newUser, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return next(new error("Please provide email and password"), 400);
    }

    let user = await User.findOne({ email })
      .select("+password")
      .populate("followers")
      .populate("following")
      .populate("posts");

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new error("Incorrect email or password", 401));
    }

    createToken(user, res);
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({ status: "success" });
};

exports.authorization = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split[" "][1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new error("You are not logged in!"), 401);
  }

  const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(payload.id);
  if (!user) {
    return next(new error("The user does not exist!", 401));
  }

  req.user = user;
  res.locals.user = user;
  next();
};
