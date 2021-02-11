const express = require("express");

const favoriteController = require("../controllers/favoriteController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(favoriteController.getAllFavorites)
  .post(authController.authorization, favoriteController.addFavorite);

router
  .route("/:id")
  .delete(authController.authorization, favoriteController.removeFavorite);

module.exports = router;
