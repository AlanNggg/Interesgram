const crypto = require("crypto");
const User = require("../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const error = require("../utils/CustomError");
const sendEmail = require("../utils/email");
const { hash } = require("bcryptjs");

const createToken = (user, statusCode, res) => {
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

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    let newUser = await User.create(req.body);

    newUser = await newUser;

    createToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return next(new error("Please provide email and password", 400));
    }

    let user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new error("Incorrect email or password", 401));
    }

    createToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
    });
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

exports.authorization = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new error("You are not logged in!", 401));
    }

    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id);
    if (!user) {
      return next(new error("The user does not exist!", 401));
    }

    if (user.changedPasswordAfter(payload.iat)) {
      return next(
        new error("User recently changed password! Please log in again!", 401)
      );
    }

    req.user = user;
    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new error("There is no user with email address.", 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetpassword/${resetToken}`;

  try {
    const options = {
      email: user.email,
      subject: "Interesgram password reset token (valid for 10 min)",
      message: `Please submit a PATCH request with your new password and passwordConfirm to :${resetURL}.\nIf you didn't forget your password, please ignore this email!`,
    };

    await sendEmail(options);

    res.status(200).json({
      status: "success",
      message: "Reset Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new error("There was an error sending email. Try again later!", 500)
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new error("Token is invalid or has expired", 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.psswordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    createToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (
      !(await user.comparePassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new error("Your current password is wrong.", 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};
