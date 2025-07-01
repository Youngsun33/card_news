const post = require("./post");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: post(sequelize, DataTypes), // Post 모델을 참조
                key: "id", // Post 모델의 기본 키
            },
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "comments", // Comment 모델을 참조
                key: "id", // Comment 모델의 기본 키
            },
        },
        userId: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        likesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
      tableName: "comments",
    }
  );
    // Comment 모델과 다른 모델 간의 관계 설정
    Comment.associate = function(models) {
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            targetKey: 'id',
            as: 'post',
        });
        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
            as: 'author',
        });
        Comment.hasMany(models.Like, {
            foreignKey: 'targetId',
            sourceKey: 'id',
            as: 'likes',
            constraints: false,
        });
    };
    return Comment;
    
};