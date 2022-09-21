'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('products', [
  {
    price: 2.20,
    name: 'Skol Lata 250ml' ,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    price: 7.50,
    name:'Heineken 600ml',
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  {
    price: 2.49,
    name: 'Antarctica Pilsen 300ml',
    url_image:'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  },
   
  {
    price: 7.50,
    name:'Brahma 600ml' ,
    url_image:'http://localhost:3001/images/brahma_600ml.jpg',
  },

  {
    price: 2.19,
    name: 'Skol 269ml',
    url_image: 'http://localhost:3001/images/skol_269ml.jpg',
  },

  {
    price: 4.49,
    name: 'Skol Beats Senses 313ml',
    url_image:'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
  },

  {
    price: 4.99 ,
    name: 'Becks 330ml',
    url_image:'http://localhost:3001/images/becks_330ml.jpg',
  },

  {
    price: 8.89 ,
    name: 'Becks 600ml',
    url_image: 'http://localhost:3001/images/becks_600ml.jpg',
  },

  {
    name:'Brahma Duplo Malte 350ml',
    price: '2.79', 
    url_image:'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg'
  },

  {
    price: 3.57,
    name: 'Skol Beats Senses 269ml',
    url_image: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
  },

  {
    price: 3.49,
    name: 'Stella Artois 275ml',
    url_image: 'http://localhost:3001/images/stella_artois_275ml.jpg',
  },
   ], { timestamps: false})
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('products', null, {})
  }
};
