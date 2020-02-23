const express = require('express');
const config = require('./config/default');
const cookieParser = require('cookie-parser');
const path = require('path');
const {createConnection} = require('./db/index');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client', 'out')));
require('./routers/index')(app);

const PORT = config.port || 3000;

const start = async () => {
  try {
    await createConnection();
    app.listen(PORT, () => console.log(`App has been started on ${PORT}`));
  } catch (e) {
    process.exit(1);
  }
};

start();
