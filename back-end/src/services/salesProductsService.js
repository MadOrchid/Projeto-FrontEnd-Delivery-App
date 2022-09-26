const { SalesProducts } = require('../database/models');

const salesProductsServices = {
  create: async (products, saleId) => {
    const addProducts = products.map(({ productId, quantity }) => ({
      saleId,
      productId,
      quantity,
    }));
    await SalesProducts.bulkCreate(addProducts);
  },
};

module.exports = salesProductsServices;
