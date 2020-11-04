const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      unique: true,
      trim: true,
      maxlength: 20,
      minlength: 1,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    avator: {
      type: String,
      trim: true,
      default: "avator.png",
    },
    info: {
      type: String,
      default: "This person is lazy.",
      maxlength: 100,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("followers", {
  ref: "Follow",
  localField: "_id",
  foreignField: "following",
});

userSchema.virtual("following", {
  ref: "Follow",
  localField: "_id",
  foreignField: "follower",
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
