// 인증(회원가입/로그인) 관련 컨트롤러
// 회원가입, 로그인, 내 정보 조회 등 인증 기능을 담당합니다.

const models = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utlis/token");
const { authenticate } = require("../middlewares/auth");

const register = async (req, res) => {
  try {
    const { userId, password, name, nickname } = req.body;
    const hashanPassword = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      userId,
      name,
      password: hashanPassword,
      nickname,
    });
    res.status(201).json({ message: "ok", data: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { userId, password } = req.body;
  // 1. 사용자가 있는지 확인
  const user = await models.User.findOne({
    where: { userId: userId },
  });
  // 2. 사용자가 없으면 잘못된 이메일 비밀번호라고 알려줌
  if (!user) {
    return res.status(400).json({ message: "Invalid ID and password1" });
  }
  // 3. 사용자가 있으면 비밀번호 비교
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // 비밀번호가 일치하지 않으면 사용자에게 노티
    return res.status(400).json({ message: "Invalid email and password" });
  }
  // 4. 정당한 사용자(이메일과 비밀번호가 일치하면) 임시허가증 발급
  const accessToken = generateAccessToken(user);
  res.json({ message: "ok", accessToken: accessToken, user });
};

// 내 정보 조회 (토큰 필요)
const me = [
  authenticate,
  async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "not authorized" });
    res.json({ user: req.user });
  },
];

module.exports = {
  register,
  login,
  me,
};
