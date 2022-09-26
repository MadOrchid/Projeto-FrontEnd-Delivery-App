const moment = require('moment');
const { Sale } = require('../database/models');
const { User } = require('../database/models');
const salesProductsServices = require('./salesProductsService');

const saleService = {
  findUSer: async (name) => {
    const user = await User.findOne({
      where: { name },
      attributes: { exclude: ['password'] },
      raw: true,
    });
    return user.id;
  },

  createOrder: async (
    { userName, sellerName, totalPrice, deliveryAddress, deliveryNumber, products }) => {
    const userId = await saleService.findUSer(userName);
    const sellerId = await saleService.findUSer(sellerName);
    const status = 'Pendente';
    const saleDate = moment().format();
    const { dataValues } = await Sale.create(
      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status },
    );
    const { id } = dataValues;
    await salesProductsServices.create(products, id);
  },
};

module.exports = saleService;
