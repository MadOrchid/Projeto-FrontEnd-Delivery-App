const { SalesProducts } = require('../database/models');

const salesProductsServices = {
  create: async (products, saleId) => {
    const addProducts = products.map(({ productId, quantity }) => ({
      saleId,
      productId,
      quantity,
    }));
    const test = addProducts[0];
    const { productId, quantity } = test;
    await SalesProducts.create({ saleId, productId, quantity });
    // const saleProducts = await SalesProducts.bulkCreate([addProducts]);
    // const result = await Promise.all(products.map(async (product) => {
    //   const { productId, quantity } = product;
    //   await SalesProducts.create({ saleId, productId, quantity });
    // }));
  },
};

module.exports = salesProductsServices;
