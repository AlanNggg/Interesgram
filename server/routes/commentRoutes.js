const express = require("express");

const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

// Post /post/:postId/comments
// Get /post/:postId/comments
// Post /comments
router
  .route("/")
  .get(commentController.getAllComments)
  .post(authController.authorization, commentController.createComment);

router
  .route("/:id")
  .get(commentController.getComment)
  .delete(authController.authorization, commentController.deleteComment);

module.exports = router;
