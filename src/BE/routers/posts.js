const express = require("express");
const router = express.Router();
const postsController = require("../controller/posts");

router.post("/", postsController.createPost);
router.get("/", postsController.getPostAll);
router.get("/:id", postsController.getOnePost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

router.post("/:postId/comments", postsController.createComment);
router.get("/:postId/comments", postsController.findComments);
router.put("/:postId/comments/:id", postsController.updateComment);
router.delete("/:postId/comments/:id", postsController.deleteComment);

module.exports = router;
