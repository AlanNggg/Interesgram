const Post = require("../models/postModel");

exports.getAllPosts = async (req, res) => {
  try {
    // author name, highest views, highest likes, createdAt
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];

    excludedFields.forEach((el) => delete queryObj[el]);

    const modifiedQueryObj = Object.assign(
      {},
      ...Object.keys(queryObj).map((key) => {
        if (key === "userID") return { [key]: queryObj[key] };

        const regex = new RegExp(queryObj[key], "i");
        const el = {
          [key]: {
            $regex: regex,
          },
        };
        return el;
      })
    );

    let query = Post.find(modifiedQueryObj);

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.sort) {
      const sort = req.query.sort.replace(/,/g, " ");
      query = query.sort(sort);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      // e.g. user ID, image, description
      const fields = req.query.fields.replace(/,/g, " ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const posts = await query;

    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        post: null,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
