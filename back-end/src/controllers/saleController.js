const saleService = require('../services/saleService');

const saleController = {
  create: async (req, res) => {
    await saleService.createOrder(req.body);
    return res.status(201).end();
  },
};

module.exports = saleController;
