const jwtService = require('../helpers/jwt');
const ApiError = require('../middlewares/ApiError');

const authController = {
  validateToken: (req, _res, next) => {
    const { authorization } = req.headers;

    jwtService.validateToken(authorization);

    next();
  },

  validateAdmin: (req, _res, next) => {
    const { authorization } = req.headers;

    const { data } = jwtService.validateToken(authorization);

    if (data.role !== 'administrator') throw new ApiError(401, 'invalid role');

    next();
  },
};

module.exports = authController;
