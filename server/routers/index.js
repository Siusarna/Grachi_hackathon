const textRequests = require('./textRequests/textRequest');
const path = require('path');

module.exports = app => {
  textRequests(app);
  app.get('/', (req, res) => {
    console.log(path.join(__dirname, '..', 'index.html'));
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });
};
