'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salesProducts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
      },

    seleId: {
      type: Sequelize.INTEGER,
      allowNull:false,
      references: {
        model: "sales",
        key: 'id'
      },
     field: "sale_id" 
    },
    
    productId: {
      type: Sequelize.INTEGER,
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