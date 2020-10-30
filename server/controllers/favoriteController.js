const Favorite = require("../models/favoriteModel");

exports.getAllFavorites = async (req, res) => {
  try {
    // post ID, user ID, createdAt
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];

    let query = Favorite.find(queryObj);

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query.skip(skip).limit(limit);

    if (req.query.sort) {
      const sort = req.query.sort.replace(/,/g, " ");
      query = query.sort(sort);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      // e.g. favorite post ID
      const fields = req.query.fields.replace(/,/g, " ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const favorites = await query;

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
    const favorite = req.body;
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
    const favorite = favoritesObj.find((el) => el._id == req.params.id);
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
