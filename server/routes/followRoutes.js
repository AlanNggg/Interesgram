const express = require("express");

const followController = require("../controllers/followController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.authorization);

router
  .route("/")
  .get(followController.getFollows)
  .post(followController.addFollow);

router.route("/:id").delete(followController.removeFollow);

module.exports = router;
