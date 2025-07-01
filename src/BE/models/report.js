module.exports = (sequelize, DataTypes) => {
const Report = sequelize.define(
    "Report",
    {
        targetType: {
            type: DataTypes.ENUM('post', 'comment', 'chat'),
            allowNull: false,
        },
        targetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
    },
    {
        tableName: "reports",
        timestamps: false,
    }
);
    // Report 모델과 다른 모델 간의 관계 설정
    Report.associate = function(models) {
        Report.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'reporter',
        });
        Report.belongsTo(models.Post, {
            foreignKey: 'targetId',
            constraints: false,
            as: 'post',
        });
        Report.belongsTo(models.News, {
            foreignKey: 'targetId',
            constraints: false,
            as: 'news',
        });
        Report.belongsTo(models.Chat, {
            foreignKey: 'targetId',
            constraints: false,
            as: 'chat',
        });
    }
    return Report;

};