const {readRequest} = require('../../controllers/api/textRequests/index');

module.exports = (app) => {
  app.get('/api/requests', readRequest);
};
