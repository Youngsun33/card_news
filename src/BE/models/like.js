module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      newsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "likes",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["userId", "newsId"],
        },
      ],
    }
  );
  Like.associate = function (models) {
    Like.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "userId",
      as: "user",
    });
    Like.belongsTo(models.News, {
      foreignKey: "newsId",
      sourceKey: "id",
      as: "news",
    });
  };
  return Like;
};
