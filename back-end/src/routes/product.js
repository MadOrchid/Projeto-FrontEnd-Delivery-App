const { Router } = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const product = Router();

product.use(authController.validateToken);

product.get('/', productController.list);

module.exports = product;
