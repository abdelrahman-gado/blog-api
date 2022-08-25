const express = require("express");
const displayController = require("../controllers/displayController");

const router = express.Router();

router.get("/posts", displayController.getAllPosts);

router.get("/posts/:postId", displayController.getSpecificPost);

router.get(
  "/posts/:postId/comments",
  displayController.getCommentsOfSpecificPost
);

router.post(
  "/posts/:postId/comments",
  displayController.createCommentOnSpecificPost
);

router.get(
  "/posts/:postId/comments/:commentId",
  displayController.getSpecificCommentOfSpecificPost
);

module.exports = router;
