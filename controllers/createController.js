const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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
    jwt.sign({ email: req.user.email }, secret, opts, (err, token) => {
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

exports.getUserPosts = (req, res, next) => {
  res.json({ message: "Not Implemented YET" });
};

exports.createPost = (req, res, next) => {
  res.json({ message: "Not Implemneted YET" });
};

exports.getSpecificPost = (req, res, next) => {
  res.json({ message: "Not Implemneted YET" });
};

exports.updateSpecificPost = (req, res, next) => {
  res.json({ message: "Not Implemneted YET" });
};

exports.deleteSpecificPost = (req, res, next) => {
  res.json({ message: "Not Implemneted YET" });
};
