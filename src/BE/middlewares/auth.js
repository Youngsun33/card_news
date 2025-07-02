const jwt = require("jsonwebtoken");
const models = require("../models");

const authenticate = async (req, res, next) => {
  let token;
  // req.headers.authorization : Beaerer eyxxxxxxxx
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    console.log(req.user)
  }
  if (!token) {
    return res.status(401).json({ message: "not authorizedㅋ" });
  }
  try {
    const decoded = jwt.verify(token, "access_token");
    // userId로 DB에서 유저 전체 정보 조회
    const user = await models.User.findOne({
      where: { userId: decoded.userId },
    });
    if (!user) return res.status(401).json({ message: "Invalid user" });
    req.user = user; // req.user에 전체 유저 객체 할당
    next(); // 다음 미들웨어 또는 핸들러 함수로 이동하세요
  } catch (err) {
    return res.status(401).json({ message: "not authorized" });
  }
};

module.exports = {
  authenticate,
};
