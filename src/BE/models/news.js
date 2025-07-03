const bookmark = require("./bookmark");

module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    "News",
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Kotitle: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Kodescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "news",
    }
  );
  // News 모델과 다른 모델 간의 관계 설정
  News.associate = function (models) {
    News.hasMany(models.Like, {
      foreignKey: "newsId", // targetId → newsId로 명확히
      sourceKey: "id",
      as: "likes",
      constraints: false,
    });
    News.hasMany(models.Bookmark, {
      foreignKey: "newsId",
      sourceKey: "id",
      as: "bookmarks",
      constraints: false,
    });
  };
  return News;
};
