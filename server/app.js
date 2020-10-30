const express = require("express");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const followRoutes = require("./routes/followRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

app = express();

app.use(express.json());

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/follows", followRoutes);
app.use("/api/v1/favorites", favoriteRoutes);

module.exports = app;
