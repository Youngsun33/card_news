// 사용자(User) 관련 컨트롤러
// 회원 정보 조회, 수정, 삭제 등 사용자 관리 기능을 담당합니다.

const models = require("../models");
const bcrypt = require("bcryptjs");

//유저생성
const createUser = async (req, res) => {
  const { userId, password, name, nickname } = req.body;
  const hashanPassword = await bcrypt.hash(password, 20);
  const user = await models.User.create({
    userId,
    password: hashanPassword,
    name,
    nickname,
  });
  res.status(200).json({ message: "ok", data: user });
};

//조회
const getUserAll = async (req, res) => {
  const users = await models.User.findAll();
  res.status(200).json({ message: "ok", data: users });
};

//한명만 조회- 아이디? 닉네임?
const getUserOne = async (req, res) => {
  const userIdOrNickname = req.params.userIdOrNickname; //라우터에서 한거랑 똑같이. 받아오는 인자는 하나이기 때문에
  const user = await models.User.findOne({
    where: {
      [models.Sequelize.Op.or]: [
        { userId: userIdOrNickname },
        { nickname: userIdOrNickname },
      ],
    },
  });
  if (user) {
    res.status(200).json({ message: "ok", data: user });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

//업데이트 (닉네임? 이나 카테고리)
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { nickname } = req.body;
  const user = await models.User.findOne({
    where: {
      userId: userId,
    },
  });
  if (user) {
    if (nickname) user.nickname = nickname;
    await user.save();
    res.status(200).json({ message: "ok", data: user });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

//삭제
const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  const result = await models.User.destroy({ where: { userId: userId } });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

module.exports = { createUser, getUserAll, getUserOne, updateUser, deleteUser };
