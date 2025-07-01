const express = require('express');
const router = express.Router();
const { saveNewsList, fetchAndSaveNews } = require('../controllers/newsList');

// 뉴스 articles 배열을 DB에 저장
router.post('/', saveNewsList);

// 외부 뉴스 API를 백엔드에서 호출하고 DB에 저장
router.get('/', fetchAndSaveNews);

module.exports = router;
