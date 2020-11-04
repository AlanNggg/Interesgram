const Favorite = require("../models/favoriteModel");
const QueryFunctions = require("../utils/queryFunctions");

exports.getAllFavorites = async (req, res) => {
  try {
    // post ID, user ID, createdAt
    const queryObj = new QueryFunctions(Favorite.find(), req.query)
      .filter()
      .sort()
      .select();

    const favorites = await queryObj.query.populate("user").populate("post");

    res.status(200).json({
      status: "success",
      data: {
        favorites,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        favorite,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        favorite: null,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
