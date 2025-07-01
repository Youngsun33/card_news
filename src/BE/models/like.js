module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
        "Like",
        {
            
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            targetType: {
                type: DataTypes.ENUM('post', 'comment', 'news'),
                allowNull: false,
            },
            targetId: {
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
                    fields: ['userId', 'targetType', 'targetId'],
                },
            ],
        }
    );
    // Like 모델과 다른 모델 간의 관계 설정
    Like.associate = function(models) {
        Like.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
            as: 'user',
        });
        Like.belongsTo(models.Post, {
            foreignKey: 'targetId',
            targetKey: 'id',
            constraints: false,
            as: 'post',
        });
        Like.belongsTo(models.Comment, {
            foreignKey: 'targetId',
            targetKey: 'id',
            constraints: false,
            as: 'comment',
        });
        Like.belongsTo(models.News, {
            foreignKey: 'targetId',
            targetKey: 'id',
            constraints: false,
            as: 'news',
        });

    }

    return Like;
};