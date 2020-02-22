const textRequests = require('./textRequests/textRequest');

module.exports = app => {
  textRequests(app);
};
