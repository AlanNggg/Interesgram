const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("../models/userModel");

dotenv.config({
  path: "../config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const deleteData = async () => {
  try {
    await User.deleteMany({});
    console.log("Delete Successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--delete") deleteData();
