const md5 = require('md5');
const { users } = require('../database/models');
const jwtService = require('../helpers/jwt');

const loginService = {
  login: async ({ email, password }) => {
    const md5Hash = md5(password);
    const user = await users.findOne({ 
      where: { email, password: md5Hash },
      attributes: { exclude: ['password', 'id'] },
      raw: true });
    
    if (!user) {
      return 'not user';
    }
    
    const token = jwtService.createToken(user);
    const result = { ...user, token };
    return result;
  },
};

module.exports = loginService;