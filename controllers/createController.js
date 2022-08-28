const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

// The signup controller is for easily create user instead of
// writing directly to the DB, test the API
// So we will assume that the user will provide valid inputs
exports.signup = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash,
      });

      newUser.save((err) => {
        if (err) {
          return next(err);
        }

        res.json({ message: "User is created Successfully" });
      });
    });
  });
};

exports.login = [
  body("email").escape(),

  body("password").escape(),

  passport.authenticate("local", { session: false }),

  (req, res, next) => {
    const opts = { expiresIn: "7d" };
    const secret = process.env.SECRET;
    jwt.sign({ userId: req.user._id }, secret, opts, (err, token) => {
      if (err) {
        return res.status(401).json({ message: "Auth Failed" });
      }

      return res.status(200).json({
        message: "Auth Passed (You are logged in)",
        token,
      });
    });
  },
];

exports.getUserPosts = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user) {
      const userId = req.user;
      Post.find({ author: userId })
        .populate("author", "firstname lastname email")
        .select("title content timestamp published")
        .exec((err, result) => {
          if (err) {
            return next(err);
          }

          if (result.length === 0) {
            return res.status(204).json({ message: "No content" });
          }

          return res.json(result);
        });
    }
  },
];

exports.createPost = [
  body("title").escape(),
  body("content").escape(),
  passport.authenticate("jwt", { session: false }),

  (req, res, next) => {
    const { title, content, published } = req.body;
    if (req.user) {
      const newPost = new Post({
        title: title,
        content: content,
        author: req.user,
        timestamp: new Date(),
        published: published,
      });

      newPost.save((err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Error in creating the post" });
        }

        return res
          .status(200)
          .json({ message: "Post created successfully", post: newPost });
      });
    }
  },
];

exports.getSpecificPost = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const id = req.params.postId;
    if (req.user) {
      Post.findById(id)
        .populate("author", "firstname lastname email")
        .select("title content timestamp published")
        .exec((err, post) => {
          if (err) {
            return res.status(400).json({ message: "Error in getting post" });
          }

          if (!post) {
            return res.status(404).json({ message: "Post id Not Found" });
          }

          return res.status(200).json(post);
        });
    }
  },
];

exports.updateSpecificPost = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { title, content, published } = req.body;
    const postId = req.params.postId;
    if (req.user) {
      Post.findByIdAndUpdate(postId, { title, content, published }, (err) => {
        if (err) {
          return res.status(400).json({ message: "Error in updating post" });
        }

        return res
          .status(200)
          .json({ message: "Post is updated successfully" });
      });
    } else {
      return res.status(401).json({ message: "Auth Failed" });
    }
  },
];

exports.deleteSpecificPost = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const postId = req.params.postId;
    if (req.user) {
      Post.findByIdAndDelete(postId).exec((err, post) => {
        if (err) {
          return res.status(400).json({ message: "Error in deleting post" });
        }

        return res
          .status(200)
          .json({ message: "Post is deleted successfully", deletedPost: post });
      });
    } else {
      return res.status(401).json({ message: "Auth Failed" });
    }
  },
];
