const express = require("express");
const router = express.Router();
const chatsController = require("../controller/chat");
const { authenticate } = require("../middlewares/auth");

router.post("/", authenticate, chatsController.createChat);

module.exports = router;
