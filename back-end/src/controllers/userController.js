const userService = require('../services/usersService');

const userController = {
  create: async (req, res) => {
    await userService.validateBody(req.body);
    const { email, name } = req.body;
    await userService.checkIfExist({ email, name });
    const result = await userService.create(req.body);

    res.status(201).json(result);
  },

  listSellers: async (req, res) => {
    const result = await userService.listSellers();

    res.status(200).json(result);
  },
};

module.exports = userController;