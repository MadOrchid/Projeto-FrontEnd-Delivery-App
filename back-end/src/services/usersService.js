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

  return true;
  },

  create: async ({ email, password, name }) => {
    const role = 'customer';
    const md5Hash = md5(password);
    const userObj = { email, role, name };
    await User.create({ 
      email, password: md5Hash, role, name,
    });
    
    const token = jwtService.createToken(userObj);
    const result = { ...userObj, token };
    return result;
  },
};

module.exports = userService;