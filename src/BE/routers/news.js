const express = require('express');
const router = express.Router();
const newsController = require('../controller/news');

// 뉴스 articles 배열을 DB에 저장
router.post('/', newsController.createNews);

// 헤드라인 뉴스(메인) 조회
router.get('/headlines', newsController.getHeadlines);

// 검색 뉴스 조회
router.get('/search', newsController.searchNews);

// 뉴스 상세 조회 (id 기반)
router.get('/:id', newsController.getOneNews);

module.exports = router;
