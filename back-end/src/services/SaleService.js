const { Sale } = require('../database/models');
const { User } = require('../database/models');

const saleService = {
  findUSer: async (name) => {
    const user = await User.findOne({ 
      where: { name },
      attributes: { exclude: ['password'] },
      raw: true 
      }
    );
    return user.id
  },

  createOrder: async ({userName,sellerName, totalPrice, deliveryAddress, deliveryNumber,saleDate, saleProducts}) => {
    const userId = saleService.findUSer(userName);
    const sellerId = saleService.findUSer(sellerName);
    const status = 'Pendente';

  }
}