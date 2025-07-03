const express = require("express");
const router = express.Router();
const bookmarkController = require("../controller/bookmark");
const { authenticate } = require("../middlewares/auth");

router.post("/:newsId", authenticate, bookmarkController.createBM);

module.exports = router;
