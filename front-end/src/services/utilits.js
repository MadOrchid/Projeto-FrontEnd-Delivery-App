const emailRagex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
const minPassword = 6;
const okCode = 200;
const badReq = 400;
const minName = 12;

module.exports = {
  emailRagex,
  minPassword,
  okCode,
  badReq,
  minName,
};
