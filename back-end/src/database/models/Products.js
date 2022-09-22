'use strict';

const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
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
      price: {
        type: DataTypes.DECIMAL,
      },
      urlImage: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'products',
      underscored: true,
    }
  );
  return Product;
};

module.exports = ProductModel;
