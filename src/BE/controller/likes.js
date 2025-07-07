// 좋아요(Like) 관련 컨트롤러
// 뉴스/게시글 좋아요 토글 및 상태 조회 기능을 담당합니다.

const models = require("../models");

const postLike = async (req, res) => {
  const { newsId } = req.params;
  const userId = req.user.userId;

  // const
};
