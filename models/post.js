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
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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