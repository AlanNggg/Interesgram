const Favorite = require("../models/favoriteModel");
const QueryFunctions = require("../utils/queryFunctions");

// Get all posts that users like (usage: Recommendation feature in the future)
exports.getAllFavorites = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.userId) {
      filter = { user: req.params.userId };
    } else if (req.params.postId) {
      filter = { post: req.params.postId };
    }
    // post ID, user ID, createdAt
    const queryObj = new QueryFunctions(Favorite.find(filter), req.query)
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

exports.favoriteOrNot = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.postId) {
      filter = { post: req.params.postId, user: req.user.id };
    } else {
      const { post } = req.query;
      if (!post) {
        return next(new error("Please provide postId", 400));
      }
      filter = { post, user: req.user.id };
    }

    // post ID, user ID, createdAt
    const favorite = await Favorite.findOne(filter);

    let isFavorite = undefined;
    if (favorite) {
      isFavorite = true;
    } else {
      isFavorite = false;
    }

    res.status(200).json({
      status: "success",
      data: {
        isFavorite,
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

exports.removeFavoriteByPostId = async (req, res, next) => {
  try {
    let filter = {};
    const { post } = req.body;
    if (!post) {
      return next(new error("Please provide postId", 400));
    }
    filter = { post, user: req.user.id };

    await Favorite.findOneAndDelete(filter);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
