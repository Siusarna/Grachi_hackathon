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
    await updateOneDocInDb(User, {_id: user._id}, {secretKeyForVerifyPhones});
    const messageForSecretKey = `Щоб завершити реєстрацію використовуйте код: ${secretKeyForVerifyPhones}`;
    const baseUri = 'https://semysms.net/api/3/sms.php?';
    const objForForm = {
      phone: `+38${phones}`,
      msg: messageForSecretKey,
      token: '5b4489753af0ed45498918dd626bcd26',
      device: '201617',
    };
    await rp.post(baseUri).form(objForForm);

    return res.json({message: 'Ok'});
  } catch (e) {
    console.log(e);
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
