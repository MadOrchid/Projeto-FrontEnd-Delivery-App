const jwtService = require('../helpers/jwt');

const authController = {
  validateToken: (req, _res, next) => {
    const { authorization } = req.headers;

    jwtService.validateToken(authorization);

    next();
  },
};

module.exports = authController;
