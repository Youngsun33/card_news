const models = require("../models");

// 뉴스 데이터 저장 (여러 개 한 번에)
const createNews = async (req, res) => {
  try {
    const newsArray = req.body.articles; // 프론트에서 articles 배열로 보낸다고 가정
    if (!Array.isArray(newsArray) || newsArray.length === 0) {
      return res.status(400).json({ message: "저장할 뉴스 데이터가 없습니다." });
    }

    let duplicateCount = 0;
    const createdNews = await Promise.all(
      newsArray.map(async (news) => {
        // url 중복 체크
        const exists = await models.News.findOne({ where: { url: news.url } });
        if (exists) {
          duplicateCount++;
          return null; // 중복이면 저장하지 않음
        }
        return await models.News.create({
          title: news.title,
          author: news.author || "unknown",
          publishedAt: news.publishedAt,
          description: news.description,
          image: news.urlToImage,
          url: news.url,
          Kotitle: news.title_ko || null,
          Kodescription: news.description_ko || null,
        });
      })
    );

    // null(중복) 제거
    const filteredNews = createdNews.filter((item) => item !== null);

    res.status(201).json({ 
      message: `뉴스 저장 완료 (중복: ${duplicateCount}건 제외)`, 
      data: filteredNews 
    });
  } catch (error) {
    console.error("뉴스 저장 오류:", error);
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

module.exports = {
  createNews,
};
