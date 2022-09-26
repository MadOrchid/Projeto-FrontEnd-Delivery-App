'use strict';

const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    }
  );

  Sale.associate = (db) => {
    Sale.belongsTo(db.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }
  return Sale;
};

module.exports = SaleModel;
