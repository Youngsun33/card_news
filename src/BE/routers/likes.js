const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const likesController = require("../controller/likes");

// 게시글 좋아요
router.post("/posts/:postId/like", authenticate, likesController.togglePostLike);
router.get("/posts/:postId/like", authenticate, likesController.getPostLikeStatus);
// 기사 좋아요
router.post("/news/:newsId/like", authenticate, likesController.toggleNewsLike);
router.get("/news/:newsId/like", authenticate, likesController.getNewsLikeStatus);

module.exports = router;
