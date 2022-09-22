const { Product } = require('../database/models');

const productService = {

list: async () => {
  const products = await Product.findAll({
    attributes: { exclude: ['id'] }
  });
  return products;
}
};

module.exports = productService;
