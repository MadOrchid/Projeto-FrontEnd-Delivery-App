const { Product } = require('../database/models');

const productService = {

list: async () => {
  const products = await Product.findAll();
  return products;
}
};

module.exports = productService;
