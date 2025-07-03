module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    "Bookmark",
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      newsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "bookmarks",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["userId", "newsId"],
        },
      ],
    }
  );
  // Bookmark 모델과 다른 모델 간의 관계 설정
  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onDelete: "CASCADE",
      as: "user",
    });
    Bookmark.belongsTo(models.News, {
      foreignKey: "newsId",
      targetKey: "id",
      onDelete: "CASCADE",
      as: "news",
      constraints: false,
    });
  };
  return Bookmark;
};
