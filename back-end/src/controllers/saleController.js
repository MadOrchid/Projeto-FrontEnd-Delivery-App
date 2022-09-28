const saleService = require('../services/saleService');

const saleController = {
  create: async (req, res) => {
    const id = await saleService.createOrder(req.body);
    return res.status(201).json({ id });
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const result = await saleService.findById(id);
    return res.status(200).json(result);
  },

  findSaleByUserId: async (req, res) => {
    const { id } = req.params;
    const result = await saleService.findUserById(id);
    return res.status(200).json(result);
  },
};

module.exports = saleController;
