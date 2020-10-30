const express = require("express");

const favoriteController = require("../controllers/favoriteController");

const router = express.Router();

router
  .route("/")
  .get(favoriteController.getAllFavorites)
  .post(favoriteController.addFavorite);

router.route("/:id").delete(favoriteController.removeFavorite);

module.exports = router;
