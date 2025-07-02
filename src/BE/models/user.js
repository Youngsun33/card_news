const { func } = require("joi");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      //category :
    },
    {
      tableName: "users",
    }
  );
  // User 모델과 다른 모델 간의 관계 설정
  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: "authorId",
      sourceKey: "userId",
      as: "posts",
    });
    User.hasMany(models.Post, {
      foreignKey: "authorNickname",
      sourceKey: "nickname",
      as: "postsNick",
    });
    User.hasMany(models.Comment, {
      foreignKey: "userId",
      sourceKey: "userId",
      as: "comments",
    });
    User.hasMany(models.Like, {
      foreignKey: "userId",
      sourceKey: "userId",
      as: "likes",
    });

    User.hasMany(models.Bookmark, {
      foreignKey: "userId",
      sourceKey: "userId",
      as: "bookmarks",
    });
  };

  return User;
};
