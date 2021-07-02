const db = require("./index")


module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define("ChatRoom", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'chatroom',
    timestamps: true,
  });

  ChatRoom.associate = (db) => {
    db.ChatRoom.belongsTo(db.User)
  }

  return ChatRoom;
};