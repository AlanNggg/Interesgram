const Post = require("../models/postModel");
const QueryFunctions = require("../utils/queryFunctions");

exports.getAllPosts = async (req, res) => {
  try {
    // author name, highest views, highest likes, createdAt
    const queryObj = new QueryFunctions(Post.find(), req.query)
      .filter(true)
      .sort()
      .select()
      .paginate();

    const posts = await queryObj.query;

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
