const SalesProduct = (sequelize, DataTypes) => {
    const SalesProducts = sequelize.define('salesProducts', {
  
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      quantity: DataTypes.INTEGER,
    }, {
      underscored: true,
      timestamps: false,
      tableName: 'salesProducts',
    });
  
    // SalesProducts.associate = (db) => {
    //    SalesProducts.belongsToMany(db.Sales, { 
    //     as: 'sales',
    //     through: SalesProducts,
    //     foreignKey: 'productId',
    //     otherKey: 'saleId',
    //   });
  
    //    SalesProducts.belongsToMany(db.Products, { 
    //       as: 'products', 
    //       foreignKey:'saleId', 
    //       through: SalesProducts,
    //       otherKey:'productId'
    //     })
    //  }
  
     
  
    return SalesProducts;
  };
  
  module.exports = SalesProduct;
  