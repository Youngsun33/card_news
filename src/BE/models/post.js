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
    Post.associate = function(models){
        Post.belongsTo(models.User, {
            foreignKey: 'authorId',
            targetKey: 'userId',
            as: 'author',
        });
        Post.hasMany(models.Comment, {
            foreignKey: 'postId',
            sourceKey: 'id',
            as: 'comments',
        });
        Post.hasMany(models.Like, {
            foreignKey: 'targetId',
            sourceKey: 'id',
            as: 'likes',
            constraints: false,
        });
        // Bookmark 모델이 있다면 아래 주석 해제
        // Post.hasMany(models.Bookmark, {
        //     foreignKey: 'targetId',
        //     sourceKey: 'id',
        //     as: 'bookmarks',
        //     constraints: false,
        // });
    }

    return Post;
}