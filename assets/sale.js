const { Router } = require('express');
const authController = require('../controllers/authController');
const saleController = require('../controllers/saleController');

const sale = Router();

sale.use(authController.validateToken);

sale.post('/', saleController.create);
sale.get('/:id', saleController.findById);
// sale.get('/user/:id', saleController.findSaleByUserId);

module.exports = sale;
