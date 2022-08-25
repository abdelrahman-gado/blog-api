const express = require("express");
const createController = require("../controllers/createController");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {
            message: "Incorrect Username or Password!!",
          });
        }

        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Incorrect Username or Password!",
            });
          }
        });
      });
    }
  )
);

router.post("/signup", createController.signup);

router.post("/login", createController.login);

router.get("/posts", createController.getUserPosts);

router.post("/posts", createController.createPost);

router.get("/posts/:postId", createController.getSpecificPost);

router.put("/posts/:postId", createController.updateSpecificPost);

router.delete("/posts/:postId", createController.deleteSpecificPost);

module.exports = router;
