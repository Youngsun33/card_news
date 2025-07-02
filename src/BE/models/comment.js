const post = require("./post");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "posts", // Post 모델을 테이블명 문자열로 지정
                key: "id",
            },
        },
        userId: {
            type: DataTypes.STRING(100),
            allowNull: false,
            // unique: true, // 여러 유저가 댓글 작성 가능하도록 unique 제거
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