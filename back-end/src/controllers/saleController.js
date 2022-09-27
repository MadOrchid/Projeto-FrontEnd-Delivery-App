const saleService = require('../services/saleService');

const saleController = {
  create: async (req, res) => {
    await saleService.createOrder(req.body);
    return res.status(201).end();
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const result = await saleService.findById(id);
    return res.status(200).json(result);
  },
};

module.exports = saleController;
