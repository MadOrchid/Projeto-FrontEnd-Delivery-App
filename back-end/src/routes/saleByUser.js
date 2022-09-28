const { Router } = require('express');
const authController = require('../controllers/authController');
const saleController = require('../controllers/saleController');

const saleUser = Router();

saleUser.use(authController.validateToken);

saleUser.get('/:id', saleController.findSaleByUserId);

module.exports = saleUser;
