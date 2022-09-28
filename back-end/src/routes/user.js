const { Router } = require('express');
const userController = require('../controllers/userController');

const user = Router();

user.post('/', userController.create);
user.get('/sellers', userController.listSellers);

module.exports = user;