const mongoose = require('mongoose');
const rp = require('request-promise');
const {readOneDocFromDb, updateOneDocInDb} = require('../../../db/index');
require('../../../models/index');

const User = mongoose.model('User');

function getRandomInt (min, max) {
  return Math.floor(Math.random() * Math.floor(max)) + min;
}

const verifyPhonesFirstStep = async (req, res) => {
  try {
    const {phones} = req.body;

    const user = await readOneDocFromDb(User, {phones});
    const secretKeyForVerifyPhones = getRandomInt(10000, 99999);
    await updateOneDocInDb(User, user._id, secretKeyForVerifyPhones);
    const messageForSecretKey = `Щоб завершити реєстрацію використовуйте код: ${secretKeyForVerifyPhones}`;
    const baseUri = 'https://semysms.net/api/3/sms.php?';
    const uriParameters = `token=485f76945b444ecddc2f9bd72530b533&device=1&phone=+380${user.phones}&msg=${messageForSecretKey}`;
    const uriForRequest = `${baseUri}${uriParameters}`;
    await rp(uriForRequest);

    return res.json({message: 'Ok'});
  } catch (e) {
    return res.status(500)
      .json({message: 'Something went wrong'});
  }
};

const verifyPhonesSecondStep = async (req, res) => {
  try {
    const {phones, secretKey} = req.body;

    const user = await readOneDocFromDb(User, {phones});

    if (secretKey !== user.secretKeyForVerifyPhones) {
      return res.status(400).json({message: 'Incorrect secret key, pleas try again'});
    }
    await updateOneDocInDb(User, {_id: user._id}, {isActive: true});

    return res.json({message: 'Phone successfully verified'});
  } catch (e) {
    return res.status(500)
      .json({message: 'Something went wrong'});
  }
};

module.exports = {
  verifyPhonesFirstStep,
  verifyPhonesSecondStep,
};
