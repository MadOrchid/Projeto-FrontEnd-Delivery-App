const { Router } = require('express');
const authController = require('../controllers/authController');
const saleController = require('../controllers/saleController');

const sale = Router();

sale.use(authController.validateToken);

sale.post('/', saleController.create);

module.exports = sale;
