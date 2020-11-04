const express = require("express");

const favoriteController = require("../controllers/favoriteController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.authorization);

router
  .route("/")
  .get(favoriteController.getAllFavorites)
  .post(favoriteController.addFavorite);

router.route("/:id").delete(favoriteController.removeFavorite);

module.exports = router;
