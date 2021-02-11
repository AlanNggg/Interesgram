const express = require("express");

const followController = require("../controllers/followController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/followers").get(followController.getAllFollows);
router.route("/followings").get(followController.getAllFollows);

router
  .route("/")
  .get(followController.getAllFollows)
  .post(authController.authorization, followController.addFollow);

router
  .route("/:id")
  .delete(authController.authorization, followController.removeFollow);

module.exports = router;
