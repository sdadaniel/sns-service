const db = require(".")

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    idNumber: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'post',
    timestamps: true,
  });

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
  }
  return Post;
};