const textRequests = require('../../controllers/api/textRequests/index');
const middleware = require('../../middleware/checkToken');

module.exports = (app) => {
  app.post('/api/requests/readRequests', middleware, textRequests.readAllRequest);
  app.post('/api/requests/createRequest', middleware, textRequests.createRequest);
};
