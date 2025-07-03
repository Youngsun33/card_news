const models = require("../models");

const createBM = async (req, res) => {
  const newsId = req.parmas.newsId;
  const saveBM = await models.BookMark.findOne({
    where: { newsId: newsId },
  });
  if (newsId) {
    await newsId.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "post not found" });
  }
};

module.exports = { createBM };
