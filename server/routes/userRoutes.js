const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const postRoutes = require("./postRoutes");
const followRoutes = require("./followRoutes");
const favoriteRoutes = require("./favoriteRoutes");
const commentRoutes = require("./commentRoutes");

const router = express.Router();

router.use("/:userId/posts", postRoutes);
router.use("/:userId/follows", followRoutes);
router.use("/:userId/favorites", favoriteRoutes);
router.use("/:userId/comments", commentRoutes);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.authorization);

router.patch(
  "/updateCurrentUser",
  userController.uploadAvator,
  userController.resizeAvator,
  userController.updateUser
);

router
  .route("/currentUser")
  .get(userController.getCurrentUser, userController.getUser);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route("/:id").get(userController.getUser);
router.route("/by/username/:name").get(userController.getUserByUsername);

module.exports = router;
