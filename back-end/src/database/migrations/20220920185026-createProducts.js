'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4,2)
      },
      urlImage: {
        field: 'url_image',
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
      },
    })
  },

  async down (queryInterface) { 
   await queryInterface.dropTable('products');
  }
};
