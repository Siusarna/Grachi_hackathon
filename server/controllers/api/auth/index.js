const {login} = require('./login');
const {register} = require('./signUp');
const {verifyPhonesFirstStep, verifyPhonesSecondStep} = require('./verifyPhones');
module.exports = {
  register,
  login,
  verifyPhonesFirstStep,
  verifyPhonesSecondStep,
};
