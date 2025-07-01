module.exports = (Sequelize, DataTypes) => {
  const Chat = Sequelize.define(
    "Chat",
    {
      userId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "chats",
    }
  );
    // Chat 모델과 다른 모델 간의 관계 설정
    // 예: Chat.belongsTo(User, { foreignKey: 'userId' });
    Chat.associate = function(models) {
        // Chat은 익명, 관계 없음
    }

    return Chat;

};