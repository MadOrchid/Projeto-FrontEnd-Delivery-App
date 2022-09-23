const moment = require('moment');
const { Sale } = require('../database/models');
const { User } = require('../database/models');

const saleService = {
  findUSer: async (name) => {
    const user = await User.findOne({
      where: { name },
      attributes: { exclude: ['password'] },
      raw: true,
    });
    return user.id;
  },

  createOrder: async ({
    userName,
    sellerName,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  }) => {
    const userId = await saleService.findUSer(userName);
    const sellerId = await saleService.findUSer(sellerName);
    const status = 'Pendente';
    const saleDate = moment().format();
    await Sale.create(
      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status },
    );
  },
};

module.exports = saleService;
