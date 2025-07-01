const { default: Bookmark } = require("../../Components/Bookmark");
const { default: News } = require("../../Components/NewsCard/News");

module.exports = (sequelize, DataTypes) => {
  const news = sequelize.define(
    "News",
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      author : {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      desciption: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image : {
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
      Bookmarks: {
        type: DataTypes.boolean,
        defaultValue: 0,
      },   
    },
    {
      tableName: "news",
    }
  );
    // News 모델과 다른 모델 간의 관계 설정
    News.associate = function(models) {
        News.hasMany(models.Like, {
            foreignKey: 'targetId',
            sourceKey: 'id',
            as: 'likes',
            constraints: false,
        });
        // Bookmark 모델이 있다면 아래 주석 해제
        // News.hasMany(models.Bookmark, {
        //     foreignKey: 'targetId',
        //     sourceKey: 'id',
        //     as: 'bookmarks',
        //     constraints: false,
        // });
    }
    return news;
};