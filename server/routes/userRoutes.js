const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

router.use(authController.authorization);

router.patch(
  "/update",
  userController.uploadAvator,
  userController.resizeAvator,
  userController.updateUser
);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route("/:name").get(userController.getUser);
router.route("/id/:id").get(userController.getUserById);

module.exports = router;
