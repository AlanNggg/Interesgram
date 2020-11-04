const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose.connect(process.env.DATABASE_LOCAL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const port = 3000;
app.listen(port, () => {
  console.log("Connection successful");
});
