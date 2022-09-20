const sequelize = require("sequelize");

const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'users',
  });

   User.associate = (db) => {
     User.hasMany(db.Sales, { 
        as: 'sales', 
        foreignKey: 'userId' 
    });
    User.hasMany(db.Sales, { 
      as: 'sales', 
      foreignKey: 'sellerId' 
  });
   }

  return User;
};

module.exports = Users;
