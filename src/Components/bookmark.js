module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    "Bookmark",
    {
      userId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "posts", // Post 모델을 참조
          key: "id", // Post 모델의 기본 키
        },
      },
      newsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "news", // News 모델을 참조
          key: "id", // News 모델의 기본 키
        },
      },
    },
    {
      tableName: "bookmarks",
    }
  );
  // Bookmark 모델과 다른 모델 간의 관계 설정
  Bookmark.associate = function(models) {
    Bookmark.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
      as: 'user',
    });
    Bookmark.belongsTo(models.Post, {
      foreignKey: 'postId',
      targetKey: 'id',
      as: 'post',
    });
    Bookmark.belongsTo(models.News, {
      foreignKey: 'newsId',
      targetKey: 'id',
      as: 'news',
    });
  };
  return Bookmark;
};