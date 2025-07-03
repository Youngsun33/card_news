const models = require("../models");

const createChat = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "인증 정보가 없습니다." });
    }
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "content는 필수입니다." });
    }
    const userId = req.user.userId;
    const chat = await models.Chat.create({
      userId,
      content,
    });
    res.status(200).json({ message: "ok", data: chat });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

module.exports = { createChat };
