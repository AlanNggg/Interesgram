const express = require("express");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const commentRouter = require("./commentRoutes");
const favoriteRouter = require("./favoriteRoutes");

const router = express.Router({ mergeParams: true });

// router.use(authController.authorization);
const checkImage = (req, res, next) => {
  console.log(req.body);
  next();
};

// router.route("/:postId/comments").post(commentController.createComment);
router.use("/:postId/comments", commentRouter);
router.use("/:postId/favorites", favoriteRouter);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    authController.authorization,
    postController.uploadImages,
    checkImage,
    postController.resizeImages,
    postController.createPost,
    postController.updatePost
  );

router
  .route("/:id")
  .get(postController.getPost)
  .delete(authController.authorization, postController.deletePost);

module.exports = router;
