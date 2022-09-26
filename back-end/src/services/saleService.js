const moment = require('moment');
const { Sale } = require('../database/models');
const { User, Product } = require('../database/models');
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
    return id;
  },

  findById: async (id) => {
    const sale = await Sale.findByPk(id, { include: [{ 
      model: User,
      as: 'user', 
      attributes: { exclude: ['password'] },
    },
    { model: Product,
      as: 'products',
    }] });
  const { dataValues } = sale;
  
  return dataValues;
  },
};

module.exports = saleService;
