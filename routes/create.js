const express = require("express");
const createController = require("../controllers/createController");

const router = express.Router();

router.post("/signup", createController.signup);

router.post("/login", createController.login);

router.get("/posts", createController.getUserPosts);

router.post("/posts", createController.createPost);

router.get("/posts/:postId", createController.getSpecificPost);

router.put("/posts/:postId", createController.updateSpecificPost);

router.delete("/posts/:postId", createController.deleteSpecificPost);

module.exports = router;
