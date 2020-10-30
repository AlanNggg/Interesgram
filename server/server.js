const express = require("express");
const mongoose = require("mongoose");

const app = require("./app");

mongoose.connect("mongodb://localhost:27017/interesgram", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const port = 3000;
app.listen(port, () => {
  console.log("Connection successful");
});
