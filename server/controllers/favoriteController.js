const Favorite = require("../models/favoriteModel");
const QueryFunctions = require("../utils/queryFunctions");

// Get all posts that users like (usage: Recommendation feature in the future)
exports.getAllFavorites = async (req, res, next) => {
  try {
    // post ID, user ID, createdAt
    const queryObj = new QueryFunctions(Favorite.find(), req.query)
      .filter()
      .sort()
      .select();

    const favorites = await queryObj.query;

    res.status(200).json({
      status: "success",
      data: {
        favorites,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.create({
      user: req.user.id,
      post: req.body.post,
    });

    res.status(200).json({
      status: "success",
      data: {
        favorite,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
