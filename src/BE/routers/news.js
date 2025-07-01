const express = require('express');
const router = express.Router();
const newsController = require('../controller/news');

// 뉴스 articles 배열을 DB에 저장
router.post('/', newsController.createNews);

module.exports = router;
