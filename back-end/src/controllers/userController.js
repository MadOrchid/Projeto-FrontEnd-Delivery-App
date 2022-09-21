const userService = require('../services/usersService');

const userController = {
  login: async (req, res) => {
    await userService.validateBody(req.body);
    const result = await userService.create(req.body);

    res.status(201).json(result);
  },
};

module.exports = userController;