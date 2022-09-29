const saleService = require('../services/saleService');

const saleController = {
  create: async (req, res) => {
    const id = await saleService.createOrder(req.body);
    return res.status(201).json({ id });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await saleService.orderUpdateStatus({ id, status });
    return res.status(200).json(result);
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const result = await saleService.findById(id);
    return res.status(200).json(result);
  },

  findSaleByUserId: async (req, res) => {
    const { id } = req.params;
    const result = await saleService.findByUserId(id);
    return res.status(200).json(result);
  },
};

module.exports = saleController;
