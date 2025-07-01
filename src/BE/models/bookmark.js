module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    "Bookmark",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      newsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "bookmarks",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["userId", "newsId"],
        },
        {
          unique: true,
          fields: ["userId", "postId"],
        },
      ],
    }
  );
  // Bookmark 모델과 다른 모델 간의 관계 설정
  Bookmark.associate = function(models) {
    Bookmark.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Bookmark.belongsTo(models.News, {
      foreignKey: "newsId",
      as: "news",
      constraints: false,
    });
    Bookmark.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
      constraints: false,
    });
  };
  return Bookmark;
};
