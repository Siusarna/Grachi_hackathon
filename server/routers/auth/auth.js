const auth = require('../../controllers/api/auth/index');

module.exports = (app) => {
  app.post('/api/auth/login', auth.login);
  app.post('/api/auth/register', auth.register);
  app.post('/api/auth/verifyPhoneFirstStep', auth.verifyPhonesFirstStep);
  app.post('/api/auth/verifyPhoneSecondStep', auth.verifyPhonesSecondStep);
  app.post('/api/auth/resetPasswordFirstStep', auth.resetPasswordFirstStep);
  app.post('/api/auth/resetPasswordSecondStep', auth.resetPasswordSecondStep);
  app.post('/api/auth/resetPasswordThirdStep', auth.resetPasswordThirdStep);
};
