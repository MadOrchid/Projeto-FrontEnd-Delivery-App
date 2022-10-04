const md5 = require('md5');
const Joi = require('joi');
const { Op } = require('sequelize');
const ApiError = require('../middlewares/ApiError');
const { User } = require('../database/models');
const jwtService = require('../helpers/jwt'); 
const { runSchema } = require('./validationService');

const userService = {

  validateBody: runSchema(
    Joi.object({
      name: Joi.string().required().min(12).max(255),
      email: Joi.string().required().max(255).email(),
      password: Joi.string().required().min(6).max(255),
    }),
  ),

  checkIfExist: async ({ email, name }) => {
    const user = await User.findAll({ 
      where: { 
        [Op.or]: [{ email }, { name }], 
      },
      raw: true,
    });
    
    if (user.length > 0) {
      throw new ApiError(409, 'User already registered');
    }

  return user.id;
  },

  listSellers: async () => {
    const users = await User.findAll({ 
      where: { 
        role: 'seller', 
      },
      attributes: { exclude: ['password'] },
      raw: true,
    });
    return users;
  },

  listUsers: async () => {
    const users = await User.findAll({
      where: { 
        [Op.or]: [{ role: 'customer' }, { role: 'seller' }], 
      },
      attributes: { exclude: ['password'] },
      raw: true,
    });
    return users;
  },

  create: async ({ email, password, name }) => {
    const role = 'customer';
    const md5Hash = md5(password);
    const userObj = { email, role, name };
    const { dataValues } = await User.create({ 
      email, password: md5Hash, role, name,
    });
    const { id } = dataValues;
    const token = jwtService.createToken(userObj);
    const result = { ...userObj, token, id };
    return result;
  },

  createAdmin: async ({ email, password, name, role }) => {
    if (role !== 'customer' && role !== 'seller' && role !== 'administrator') {
      throw new ApiError(400, 'invalid role');
    }
    const md5Hash = md5(password);
    const userObj = { email, role, name };
    const { dataValues } = await User.create({ 
      email, password: md5Hash, role, name,
    });
    const { id } = dataValues;
    const token = jwtService.createToken(userObj);
    const result = { ...userObj, token, id };
    return result;
  },

  delete: async (id) => {
    await User.destroy({
     where: { id },
   });
 },

};

module.exports = userService;