const models = require("../models");

// 정렬 기준 매핑 함수
const getOrderBy = (sortBy) => {
  if (!sortBy) return [["publishedAt", "DESC"]];
  if (sortBy === "popularity") return [["likesCount", "DESC"]];
  if (sortBy === "relevancy") return [["id", "DESC"]]; // relevancy는 임시로 id 내림차순
  return [[sortBy, "DESC"]];
};

// 뉴스 데이터 저장 (여러 개 한 번에)
const createNews = async (req, res) => {
  try {
    const newsArray = req.body.articles; // 프론트에서 articles 배열로 보낸다고 가정
    if (!Array.isArray(newsArray) || newsArray.length === 0) {
      return res
        .status(400)
        .json({ message: "저장할 뉴스 데이터가 없습니다." });
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
          // country, category 제거
        });
      })
    );

    // null(중복) 제거
    const filteredNews = createdNews.filter((item) => item !== null);

    // 뉴스 저장 후 전체 뉴스 리스트를 DB에서 조회
    const allNews = await models.News.findAll({
      order: [["publishedAt", "DESC"]],
    });

    res.status(201).json({
      message: `뉴스 저장 완료 (중복: ${duplicateCount}건 제외)`,
      data: allNews, // 전체 뉴스 리스트로 응답
    });
  } catch (error) {
    console.error("뉴스 저장 오류:", error);
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

// 뉴스 상세 조회
const getOneNews = async (req, res) => {
  const id = req.params.id;
  const news = await models.News.findByPk(id);
  if (!news) return res.status(404).json({ message: "news not found" });

  let bookmarked = false;
  if (req.user) {
    const bm = await models.Bookmark.findOne({
      where: { userId: req.user.userId, newsId: id },
    });
    bookmarked = !!bm;
  }
  res.status(200).json({ message: "ok", data: { ...news.toJSON(), bookmarked } });
};

// 헤드라인 뉴스(메인) 조회
const getHeadlines = async (req, res) => {
  try {
    const { country, category, sortBy } = req.query;
    let where = {};
    // country, category 관련 조건 완전 제거
    const news = await models.News.findAll({
      order: getOrderBy(sortBy),
      limit: 30,
    });
    res.json({ data: news });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

// 검색 뉴스 조회
const searchNews = async (req, res) => {
  try {
    const { query, sortBy } = req.query;
    if (!query) return res.json({ data: [] });
    const { Op } = require("sequelize");
    const news = await models.News.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } }
        ]
      },
      order: getOrderBy(sortBy),
      limit: 30,
    });
    res.json({ data: news });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

module.exports = {
  createNews,
  getOneNews,
  getHeadlines,
  searchNews,
};
