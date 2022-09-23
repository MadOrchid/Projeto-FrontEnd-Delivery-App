const { Router } = require('express');
const saleController = require('../controllers/saleController');

const sale = Router();

sale.post('/', saleController.create);

module.exports = sale;
