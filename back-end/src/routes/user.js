const { Router } = require('express');
const userController = require('../controllers/userController');

const login = Router();

login.post('/', userController.create);

module.exports = login;