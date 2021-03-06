const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {isLength} = require('validator');
const {createDocInDb} = require('../../../db/index');
require('../../../models/index');

const User = mongoose.model('User');

const validData = (firstName, lastName, fatherName, phones, password) => {
  if (!isLength(password, {min: 8})) {
    return {message: 'The password is too short'};
  }
  if (!isLength(firstName, {min: 4})) {
    return {message: 'The firstName is too short'};
  }
  if (!isLength(lastName, {min: 4})) {
    return {message: 'The lastName is too short'};
  }
  if (!isLength(fatherName, {min: 4})) {
    return {message: 'The fatherName is too short'};
  }
  if (!isLength(phones, {min: 9})) {
    return {message: 'The phones number is too short'};
  }
};

const hashPass = pass => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
};

const register = async (req, res) => {
  try {
    const {firstName, lastName, fatherName, phones, password} = req.body;

    const validatedInput = validData(firstName, lastName, fatherName, phones, password);

    if (validatedInput) {
      console.log(validatedInput);
     return res.status(400).json(validatedInput);
    }

    const candidate = await User.findOne({phones});
    if (candidate) {
      console.log('exists');
      return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = hashPass(password);
    await createDocInDb(User, {firstName, lastName, fatherName, phones, password:hashedPassword, isActive: false});
    return res.status(201).json({message: 'Registration was successful'});
  } catch (e) {
    console.log(e);
    return res.status(500).json({message: 'Something went wrong'});
  }
};


module.exports = {
  register,
};
