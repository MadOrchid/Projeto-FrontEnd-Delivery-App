'use strict';

const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    'SalesProducts',
    {
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    }
  );

  SalesProductsModel.associate = (models) => {
    models.Products.belongsToMany(models.sale, {
      through: SalesProductsModel,
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'sales',
    });

    models.Sales.belongsToMany(models.product, {
      through: SalesProductsModel,
      foreignKey: 'saleId',
      otherKey: 'productId',
      as: 'products',
    });
  };
  return SalesProducts;
};

module.exports = SalesProductsModel;
