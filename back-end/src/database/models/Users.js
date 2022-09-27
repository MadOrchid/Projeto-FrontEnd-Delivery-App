'use strict';

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'users',
    }
  );

  User.associate = (db) => {
    User.hasMany(db.Sale, {
      foreignKey: 'userId',
      as: 'user'
    })
  }
  return User;
};

module.exports = UserModel;
