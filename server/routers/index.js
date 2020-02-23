const textRequests = require('./textRequests/textRequest');
const auth = require('./auth/auth');
const achi = require('./achievements/achievements');
const path = require('path');

module.exports = app => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'out', 'index.html'));
  });
  app.get('/showRequests', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'out', 'showRequests.html'));
  });
  achi(app);
  textRequests(app);
  auth(app);
};
