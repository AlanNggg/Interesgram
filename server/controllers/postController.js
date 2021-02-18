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
  if (!req.files) return next();

  console.log(req.files);
  req.body.images = [];

  await Promise.all(
    req.files.map(async (el) => {
      // req.params.id PATCH -${Date.now()}-${i + 1}
      const filename = `post-${uuid.v4()}-${Date.now()}.jpeg`;

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

exports.getAllPosts = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.userId) filter = { author: req.params.userId };
    // author name, highest views, highest likes, createdAt
    const queryObj = new QueryFunctions(Post.find(filter), req.query)
      .filter(true)
      .sort()
      .select();

    const posts = await queryObj.query.populate("numLikes");

    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: "comments",
        select: "-__v",
      })
      .populate("numLikes");

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    next(err);
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
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return next(new error("No post found with ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        post: null,
      },
    });
  } catch (err) {
    next(err);
  }
};
