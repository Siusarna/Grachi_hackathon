const {login} = require('./login');
const {register} = require('./signUp');
const {verifyPhonesFirstStep, verifyPhonesSecondStep} = require('./verifyPhones');
const {resetPasswordThirdStep, resetPasswordFirstStep, resetPasswordSecondStep} = require('./resetPassword');

module.exports = {
  register,
  login,
  verifyPhonesFirstStep,
  verifyPhonesSecondStep,
  resetPasswordFirstStep,
  resetPasswordSecondStep,
  resetPasswordThirdStep,
};
