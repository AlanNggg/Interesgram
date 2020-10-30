const express = require("express");

const followController = require("../controllers/followController");

const router = express.Router();

router
  .route("/")
  .get(followController.getAllFollows)
  .post(followController.addFollow);

router.route("/:id").delete(followController.removeFollow);

module.exports = router;
