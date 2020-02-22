const auth = require('../../controllers/api/auth/index');

module.exports = (app) => {
  app.post('/api/auth/login', auth.login);
  app.post('/api/auth/register', auth.register);
  app.get('/api/auth/verifyPhone', auth.verifyPhonesFirstStep);
  app.post('/api/auth/verifyPhone', auth.verifyPhonesSecondStep);
};
