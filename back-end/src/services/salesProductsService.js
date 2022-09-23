const { SalesProducts } = require('../database/models');

const salesProductsServices = {
  create: async ({ products, saleId }) => {
    const addProducts = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      saleId,
    }));
    const saleProducts = await SalesProducts.bulkCreate(addProducts);
    return saleProducts;
  },
};

module.exports = salesProductsServices;
