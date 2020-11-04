const multer = require("multer");
const sharp = require("sharp");
const Post = require("../models/postModel");
const QueryFunctions = require("../utils/queryFunctions");
const error = require("../utils/CustomError");
const uuid = require("uuid");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new error("Please upload images!", 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

exports.uploadImages = upload.array("images", 3);

// upload.fields([{ name: "images", maxCount: 3 }]); => req.files

exports.resizeImages = async (req, res, next) => {
  console.log("images", req.body);
  if (!req.files) return next();

  console.log(req.files);
  req.body.images = [];

  await Promise.all(
    req.files.map(async (el) => {
      // req.params.id PATCH -${Date.now()}-${i + 1}
      const filename = `post-${uuid.v4()}-${Date.now()}.jpeg`;

      console.log(filename);
      await sharp(el.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/img/posts/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
};
exports.getAllPosts = async (req, res) => {
  try {
    // author name, highest views, highest likes, createdAt
    const queryObj = new QueryFunctions(Post.find(), req.query)
      .filter(true)
      .sort()
      .select();

    const posts = await queryObj.query.populate("author");

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
    const post = await Post.findById(req.params.id).populate("author");
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

exports.createPost = async (req, res, next) => {
  try {
    const newPost = await Post.create({
      author: req.user._id,
      description: req.body.description,
    });

    if (req.body.images) {
      req.params.id = newPost._id;

      const excludedFields = ["description"];
      excludedFields.forEach((el) => delete req.body[el]);

      return next();
    }

    res.status(200).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    // res.status(400).json({
    //   status: "fail",
    //   message: err,
    // });
    console.log(err);
  }
};

exports.updatePost = async (req, res) => {
  try {
    console.log(req.body.images);
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return next(new error("No post found with ID"), 404);
    }

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
