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
        // 좋아요는 반드시 유저가 남김
        Like.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        // 좋아요는 게시글, 댓글, 기사 중 하나에 남길 수 있음
        Like.belongsTo(models.Post, {
            foreignKey: 'targetId',
            constraints: false,
            as: 'post',
        });
        Like.belongsTo(models.Comment, {
            foreignKey: 'targetId',
            constraints: false,
            as: 'comment',
        });
        Like.belongsTo(models.News, {
            foreignKey: 'targetId',
            constraints: false,
            as: 'news',
        });
    }

    return Like;
};