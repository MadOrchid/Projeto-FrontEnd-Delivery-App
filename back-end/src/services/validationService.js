const ApiError = require('../middlewares/ApiError');

const runSchema = (schema) => async (args) => {
  const { error, value } = schema.validate(args);
  if (error) {
    const { details } = error;
    const { message } = details[0];
    const returnMessage = message.replace(/\[.\]\./, '');
    throw new ApiError(400, returnMessage);
  }
  return value;
};

module.exports = { runSchema };
