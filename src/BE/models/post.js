const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) =>{
    const Post = Sequelize.define(
        "Post",
        {
           
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            authorId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            authorNickname: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            likesCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            commentCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            tableName: "posts",
        }
    );
    // Post 모델과 다른 모델 간의 관계 설정
    post.associate = function(models){
        post.belongsTo(models.User, {
            foreignKey: 'authorId',
            targetKey: 'userId',
            as: 'author',
        });
        post.hasMany(models.Comment, {
            foreignKey: 'postId',
            sourceKey: 'id',
            as: 'comments',
        });
        post.hasMany(models.Like, {
            foreignKey: 'postId',
            sourceKey: 'id',
            as: 'likes',
        });

    }

    return Post;
}