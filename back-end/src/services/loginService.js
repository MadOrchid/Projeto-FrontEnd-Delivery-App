const md5 = require('md5');
const Joi = require('joi');
const ApiError = require('../middlewares/ApiError');
const { User } = require('../database/models');
const jwtService = require('../helpers/jwt'); 
const { runSchema } = require('./validationService');

const loginService = {

  validateBody: runSchema(
    Joi.object({
      email: Joi.string().required().max(255).email(),
      password: Joi.string().required().min(6).max(255),
    }),
  ),

  login: async ({ email, password }) => {
    const md5Hash = md5(password);
    const user = await User.findOne({ 
      where: { email, password: md5Hash },
      attributes: { exclude: ['password'] },
      raw: true });
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    const token = jwtService.createToken(user);
    const result = { ...user, token };
    return result;
  },
};

module.exports = loginService;