const { createConnection } = require('./createConnection');
const { updateOneDocInDb } = require('./updateDocInDb');
const { readOneDocFromDb } = require('./readOneDocFromDb');
const { createDocInDb } = require('./createDocInDb');
const { deleteOneDocFromDb } = require('./deleteOneDocFromDb');
const { readDocsFromDb } = require('./readDocsFromDb');

module.exports = {
  createConnection,
  createDocInDb,
  updateOneDocInDb,
  readOneDocFromDb,
  readDocsFromDb,
  deleteOneDocFromDb,
};
