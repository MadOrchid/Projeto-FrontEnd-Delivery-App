const moment = require('moment');
const Joi = require('joi');
const { Op } = require('sequelize');
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

  if (!sale) throw new ApiError(404, 'Sale not found');
  const { dataValues } = sale;
  
  return dataValues;
  },

  findByUserId: async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new ApiError(404, 'User not found');

    const sale = await Sale.findAll({
      where: {
        [Op.or]: [{ userId: id }, { sellerId: id }],
      },
      include: [{ 
      model: User,
      as: 'user', 
      attributes: { exclude: ['password'] },
    },
    { model: Product,
      as: 'products',
    }] });
  
  return sale;
  },

  orderUpdateStatus: async ({ id, status }) => {
    const sale = await Sale.findByPk(id);
    if (!sale) throw new ApiError(404, 'Sale not found');
  
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
