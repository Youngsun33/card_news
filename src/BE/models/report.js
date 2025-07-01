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
            targetKey: 'id',
            as: 'reporter',
        });
        // 다른 모델과의 관계 설정이 필요할 경우 여기에 추가
    }
    return Report;

};