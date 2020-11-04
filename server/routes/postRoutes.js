const express = require("express");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.use(authController.authorization);
const checkImage = (req, res, next) => {
  console.log(req.body);
  next();
};
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
  .delete(postController.deletePost);

module.exports = router;
