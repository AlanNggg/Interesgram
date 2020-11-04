const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const followRoutes = require("./routes/followRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const error = require("./utils/CustomError");
const errorHandler = require("./utils/errorHandler");
const cors = require("cors");

app = express();
app.use(helmet());
/**
 * app.use((req, res, next) => {
 *  res.setHeader('Access-Control-Allow-Origin', '*');
 *  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
 *  res.setHeader('Access-Control-Allow-Headers, 'Content-Type, Authorization');
 *  if (req.method === 'OPTIONS') return res.sendStatus(200);
 *  next();
 * })
 */
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_SERVER_URL,
  })
);
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/follows", followRoutes);
app.use("/api/v1/favorites", favoriteRoutes);

// handles all get, post, etc for all routes
app.all("*", (req, res, next) => {
  next(new error(`${req.originalUrl} NOT FOUND`, 404));
});

// error handling middleware
app.use(errorHandler);

module.exports = app;
