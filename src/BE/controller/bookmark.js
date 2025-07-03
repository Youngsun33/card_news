const models = require("../models");

const createBM = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "인증 정보가 없습니다." });
    }

    const news = await models.News.findByPk(req.params.newsId);
    if (!news) {
      return res.status(404).json({ message: "뉴스가 존재하지 않습니다." });
    }

    // 이미 북마크된 경우 체크
    const exists = await models.Bookmark.findOne({
      where: { userId: req.user.userId, newsId: req.params.newsId },
    });
    if (exists) {
      return res.status(409).json({ message: "이미 북마크한 뉴스입니다." });
    }

    const bookmark = await models.Bookmark.create({
      userId: req.user.userId,
      newsId: req.params.newsId,
    });
    res.status(200).json({ message: "ok", data: bookmark });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "인증 정보가 없습니다." });
    }
    const news = await models.News.findByPk(req.params.newsId);
    if (!news) {
      return res.status(404).json({ message: "뉴스가 존재하지 않습니다." });
    }
    const exists = await models.Bookmark.findOne({
      where: { userId: req.user.userId, newsId: req.params.newsId },
    });
    if (exists) {
      // 이미 북마크된 경우 해제
      await exists.destroy();
      return res.status(200).json({ message: "북마크 해제됨", bookmarked: false });
    } else {
      // 북마크가 없으면 생성
      const bookmark = await models.Bookmark.create({
        userId: req.user.userId,
        newsId: req.params.newsId,
      });
      return res.status(200).json({ message: "북마크 추가됨", bookmarked: true, data: bookmark });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

module.exports = { createBM, toggleBookmark };
