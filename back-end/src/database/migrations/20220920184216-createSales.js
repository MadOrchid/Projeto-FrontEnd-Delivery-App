'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
      },

    sellerId: {
      type: Sequelize.INTEGER,
      allowNull:false,
      references: {
        model: "users",
        key: 'id'
      },
     field: "seller_id" 
    },
    
    userId: {
      type: Sequelize.INTEGER,
      allowNull:false,
      references: {
        model: "users",
        key: 'id'
      },
      field: "user_id"
    },

    totalPrice: {
      type: Sequelize.DECIMAL,
      field: 'total_price',
      allowNull: false,
    },

    deliveryAddress: {
      type: Sequelize.STRING,
      field: 'delivery_address',
      allowNull: false,
    },

    deliveryNumber: {
      type: Sequelize.STRING,
      field: 'delivery_number',
      allowNull:false,
    },

    saleDate: {
      type: Sequelize.DATE,
      field: 'sale_date',
      allowNull: false,
    },

    status: {
      type: Sequelize.STRING,
      allowNull: false,
    }
    
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales')
  }
};