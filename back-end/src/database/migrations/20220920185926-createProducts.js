'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      
      urlImage: {
        type: Sequelize.STRING,
        allowNull: false,
        field:'url_image'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products')
  }
};