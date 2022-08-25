const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

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

exports.login = (req, res, next) => {
  res.json({ message: "Not Implemented YET" });
};

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
