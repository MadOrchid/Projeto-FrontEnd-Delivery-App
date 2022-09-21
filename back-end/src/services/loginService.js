const { Users } = require('../database/models/Users');
const { passwordService } = require('../helpers/password');
const { jwtService } = require('../helpers/jwt');

const loginService = {
  login: async ({ email, password }) => {
    const user = Users.findOne({ where: { email } });
    const isPasswordRight = await passwordService.checkPassword(password, user.password);
    if (!user || !isPasswordRight) {
      return '';
    }
    const userObj = { password, ...user };
    const token = jwtService.createToken(userObj);
    const result = { ...userObj, token };
    return result;
  },
};

module.exports = loginService;