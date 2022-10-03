const moment = require('moment');
const { Op } = require('sequelize');
const Joi = require('joi');
const ApiError = require('../middlewares/ApiError');
const { Sale } = require('../database/models');
const { User, Product } = require('../database/models');
const salesProductsServices = require('./salesProductsService');
const { runSchema } = require('./validationService');

const saleService = {
  validateSale: runSchema(
    Joi.object({
      userId: Joi.number().integer().required(),
      sellerId: Joi.number().integer().required(),
      totalPrice: Joi.number().required(),
      deliveryNumber: Joi.number().required(),
      deliveryAddress: Joi.string().required(),
    }),
  ),

  findUSer: async (name) => {
    const user = await User.findOne({
      where: { name },
      attributes: { exclude: ['password'] },
      raw: true,
    });
    if (!user) {
      throw new ApiError(404, 'User not found');
    } 
    return user.id;
  },

  createOrder: async (
    { sale, products }) => {
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = sale;
    //  await serviceSale.validateSale(sale);
    // let userId = 0;
    // if ([userId].includes(sale)) {
    //   userId = sale.userId
    // } else {
    //   userId = await saleService.findUSer(userName);
    // }
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

  findByUserId: async (id) => {
    const [sale] = await Sale.findAll({
      where: { userId: id },
      include: [{ 
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

  orderUpdateStatus: async ({ id, status }) => {
    const sale = await Sale.findByPk(id);
    if (!sale) throw new ApiError(404, 'User not found');
  
    const [updated] = await Sale.update(
      {
        status,
      },
      {
        where: { id },
      },
  );
   return updated;
  },

};

module.exports = saleService;
