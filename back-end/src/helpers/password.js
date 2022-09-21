const bcrypt = require('bcryptjs');

const passwordService = {
  encryptPassword: (password) => {
    const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  },
  checkPassword: (password, hash) => bcrypt.compareSync(password, hash),
};

module.exports = passwordService;