require('dotenv/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const ApiError = require('../middlewares/ApiError');

const fileSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const secret = process.env.JWT_SECRET || fileSecret;

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, secret);
    return token;
  },

  validateToken: (token) => {
    try {
      const data = jwt.verify(token, secret);
      return data;
    } catch (e) {
      throw new ApiError(401, 'Expired or invalid token');
    }
  },
};

module.exports = jwtService;
