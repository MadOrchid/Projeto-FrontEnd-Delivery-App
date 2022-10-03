const { Router } = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const admin = Router();

admin.use(authController.validateAdmin);

admin.post('/', userController.createAdmin);
admin.get('/', userController.list);
admin.delete('/:id', userController.delete);

module.exports = admin;