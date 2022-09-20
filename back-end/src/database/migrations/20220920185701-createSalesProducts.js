'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salesProducts', {
      
    saleId: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      allowNull:false,
      references: {
        model: "sales",
        key: 'id'
      },
     field: "sale_id" 
    },
    
    productId: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      allowNull:false,
      references: {
        model: "products",
        key: 'id'
      },
      field: "product_id"
    },

    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('salesProducts')
  }
};