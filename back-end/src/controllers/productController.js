const productService = require('../services/productService');

const productController = {
  list: async(req, res) => {
    const result = await productService.list();
    return res.status(200).json(result);
  }
}

module.exports = productController;