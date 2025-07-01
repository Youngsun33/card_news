module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
        "Like",
        {
            userId: {
                type: DataTypes.INTEGER,
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
                    fields: ['userId', 'newsId'],
                },
            ],
        }
    );
    Like.associate = function(models) {
        Like.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        Like.belongsTo(models.News, {
            foreignKey: 'newsId',
            as: 'news',
        });
    }
    return Like;
};