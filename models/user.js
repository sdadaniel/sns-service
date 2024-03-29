const db = require("./index")


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    idNumber: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
      
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true

    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/img/profile/blank.png"
    },
  }, {
    tableName: 'user',
    timestamps: true,
  });

  User.associate = (db) => {
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow"
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow"
    });

    db.User.hasMany(db.Post)
    
  }
  return User;
};