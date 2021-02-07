const express = require("express");

const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.authorization);

router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.createComment);

router
  .route("/:id")
  .get(commentController.getComment)
  .delete(commentController.deleteComment);

module.exports = router;
