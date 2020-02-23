const textRequests = require('./textRequests/textRequest');
const adv_rate = require('./crup_adviser&rate/adv&rate');
module.exports = app => {
  textRequests(app);
  adv_rate(app);
};
