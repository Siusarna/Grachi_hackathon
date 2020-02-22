const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { getAndUpdateTokens } = require('../../../helpers/index');
const config = require('../../../config/default');
const { readOneDocFromDb } = require('../../../db/index');
const setDataInCookie = require('../../setDataInCookies');
require('../../../models/index');

const User = mongoose.model('User');

const matchInputDataWithDbData = async (inputPhones, inputPassword, dataFromDb) => {
  if (!dataFromDb) {
    return false;
  }
  return (await bcrypt.compare(inputPassword, dataFromDb.password) && inputPhones === dataFromDb.phones);
};


const login = async (req, res) => {
  try {
    const { phones, password } = req.body;

    const user = await readOneDocFromDb(User, { phones });
    if (!await matchInputDataWithDbData(phones, password, user)) {
      return res.status(400)
        .json({ message: 'Incorrect login or password' });
    }

    const { accessToken, refreshToken } = await getAndUpdateTokens(user._id);
    setDataInCookie(res, 'accessToken', accessToken, config.jwt.tokens.access.expiresIn);
    setDataInCookie(res, 'refreshToken', refreshToken, config.jwt.tokens.refresh.expiresIn);
    return res.send('ok');
  } catch (e) {
    return res.status(500)
      .json({ message: 'Something went wrong' });
  }
};

module.exports = {
  login,
};
