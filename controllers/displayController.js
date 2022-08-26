const Post = require("../models/Post");

exports.getAllPublishedPosts = (req, res, next) => {
  Post.find({ published: true })
    .populate("author", "firstname lastname email")
    .select("title content timestamp published")
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
  const postId = req.params.postId;
  Post.findById(postId)
    .populate("author", "firstname lastname email")
    .select("title content timestamp")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({ message: "Error in getting the post" });
      }

      return res.status(200).json({ post });
    });
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
