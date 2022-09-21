require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret_key';

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, secret);
    return token;
  },

  validateToken: (token) => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error; 
    }
  },
};

module.exports = jwtService;