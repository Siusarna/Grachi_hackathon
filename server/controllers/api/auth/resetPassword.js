const mongoose = require('mongoose');
const rp = require('request-promise');
const {isLength} = require('validator');
const {readOneDocFromDb, updateOneDocInDb} = require('../../../db/index');
require('../../../models/index');

const validData = (firstName, lastName, fatherName, phones, password) => {
  if (!isLength(password, {min: 8})) {
    return {message: 'The password is too short'};
  }
};

const User = mongoose.model('User');

function getRandomInt (min, max) {
  return Math.floor(Math.random() * Math.floor(max)) + min;
}

const hashPass = pass => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
};


const resetPasswordFirstStep = async (req, res) => {
  try {
    const {phones} = req.body;
    const user = readOneDocFromDb(User,{phones});

    const secretKeyForResetPassword = getRandomInt(10000, 99999);
    await updateOneDocInDb(User, user._id, secretKeyForResetPassword);

    const messageForSecretKey = `Щоб змінити пароль використовуйте код: ${secretKeyForResetPassword}`;
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

const resetPasswordSecondStep = async (req, res) => {
  try {
    const {phones, secretKey} = req.body;

    const user = await readOneDocFromDb(User, {phones});

    if (secretKey !== user.secretKeyForResetPassword) {
      return res.status(400).json({message: 'Incorrect secret key, pleas try again'});
    }

    return res.json({message: 'Secret key is verified. Please enter new password'});
  } catch (e) {
    return res.status(500)
      .json({message: 'Something went wrong'});
  }
};

const resetPasswordThirdStep = async (req, res) => {
  try {
    const {phones, password} = req.body;

    const validatedInput = validData(password);
    if (validatedInput) {
      res.status(400).json(validatedInput);
    }

    const hashedPassword = hashPass(password);
    await updateOneDocInDb(User,{phones},{password: hashedPassword});

    return res.json({message: 'Secret key is verified. Please enter new password'});
  } catch (e) {
    return res.status(500)
      .json({message: 'Something went wrong'});
  }
};

module.exports = {
  resetPasswordFirstStep,
  resetPasswordSecondStep,
  resetPasswordThirdStep
};
