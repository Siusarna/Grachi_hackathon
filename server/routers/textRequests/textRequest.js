const textRequests = require('../../controllers/api/textRequests/index');

module.exports = (app) => {
  app.post('/api/requests/readRequests', textRequests.readAllRequest);
  app.post('/api/requests/createRequest', textRequests.createRequest);
};
