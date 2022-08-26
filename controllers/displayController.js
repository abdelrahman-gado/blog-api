const Post = require("../models/Post");

exports.getAllPosts = (req, res, next) => {
  Post.find({})
    .populate("author", "-_id firstname lastname email")
    .select("-_id title content timestamp published")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({ message: "Error in getting posts" });
      }

      if (posts.length === 0) {
        return res.status(204).json({ message: "No Content" });
      }

      return res.status(200).json({ posts });
    });
};

exports.getSpecificPost = (req, res, next) => {
  res.json({ message: "Not implemneted YET" });
};

exports.getCommentsOfSpecificPost = (req, res, next) => {
  res.json({ message: "Not implemneted YET" });
};

exports.createCommentOnSpecificPost = (req, res, next) => {
  res.json({ message: "Not implemneted YET" });
};

exports.getSpecificCommentOfSpecificPost = (req, res, next) => {
  res.json({ message: "Not implemneted YET" });
};
