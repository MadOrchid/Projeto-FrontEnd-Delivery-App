const Sales = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sellerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'sales',
  });

  //  Sale.associate = (db) => {
  //    Sale.belongsTo(db.Users, { 
  //       as: 'users', 
  //       foreignKey: 'userId',

  //   });

  //    Sale.belongsTo(db.Users, 
  //       { as: 'users', foreignKey:'sellerId'})
  //  }

   

  return Sale;
};

module.exports = Sales;
