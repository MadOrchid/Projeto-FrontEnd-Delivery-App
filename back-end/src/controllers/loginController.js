const loginService = require('../services/loginService');

const loginController = {
  login: async (req, res) => {
    await loginService.validateBody(req.body);
    const result = await loginService.login(req.body);

    res.status(200).json(result);
  },
};

module.exports = loginController;