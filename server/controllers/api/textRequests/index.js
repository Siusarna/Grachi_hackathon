const {readOneRequest} = require('./readOneRequests');
const {createRequest} = require('./createRequest');
const {deleteRequest} = require('./deleteRequest');
const {readAllRequest} = require('./readAllRequest');

module.exports = {
  readOneRequest,
  createRequest,
  deleteRequest,
  readAllRequest
};
