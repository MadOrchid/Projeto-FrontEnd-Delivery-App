const Products = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    url_image: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'products',
  });

  Product.associate = (db) => {
    Product.hasMany(db.SalesProducts, { 
      as: 'salesProducts', 
      foreignKey: 'productId' 
    });
  }

  return Product;
};

module.exports = Products;
