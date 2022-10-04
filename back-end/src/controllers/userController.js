const userService = require('../services/usersService');

const userController = {
  create: async (req, res) => {
    const { email, name } = req.body;
    await userService.validateBody(req.body);
    await userService.checkIfExist({ email, name });
    const result = await userService.create(req.body);

    res.status(201).json(result);
  },

  createAdmin: async (req, res) => {
    const { email, name, password } = req.body;
    await userService.validateBody({ email, name, password });
    await userService.checkIfExist({ email, name });
    const result = await userService.createAdmin(req.body);

    res.status(201).json(result);
  },

  listSellers: async (req, res) => {
    const result = await userService.listSellers();

    res.status(200).json(result);
  },

  list: async (req, res) => {
    const result = await userService.listUsers();

    res.status(200).json(result);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await userService.delete(id);
    return res.status(200).json({ message: 'Deleted' });
  },
};

module.exports = userController;