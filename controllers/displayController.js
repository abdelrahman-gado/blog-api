const Post = require("../models/Post");
const Comment = require("../models/Comment");

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
  const postId = req.params.postId;
  Comment.find({ postId: postId })
    .select("email content timestamp")
    .exec((err, comments) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error in getting comments of post" });
      }

      if (comments.length === 0) {
        return res.status(204).json({ message: "No Content"});
      }

      return res.status(200).json(comments);
    });
};

exports.createCommentOnSpecificPost = (req, res, next) => {
  const { email, content, postId } = req.body;

  const newComment = new Comment({
    email: email,
    content: content,
    timestamp: new Date(),
    postId: postId,
  });

  newComment.save((err) => {
    if (err) {
      return res.status(400).json({ message: "Error in creating comment" });
    }

    return res
      .status(200)
      .json({ message: "comment created successfully", newComment });
  });
};

exports.getSpecificCommentOfSpecificPost = (req, res, next) => {
  res.json({ message: "Not implemneted YET" });
};
