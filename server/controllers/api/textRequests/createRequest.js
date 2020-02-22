const mongoose = require('mongoose');
const config = require('../../../config/default');
const jwt = require('jsonwebtoken');
const {createDocInDb} = require('../../../db/index');
require('../../../models/index');

const Requests = mongoose.model('Requests');

const createRequest = async (req, res) => {
  try {
    const {description, geolocation} = req.body;
    const accessToken = req.cookies.accessToken || req.local.accessToken;
    if (!accessToken) {
      return res.status(400).json({message: 'Unauthorized, please log in again'});
    }
    const payload = jwt.verify(accessToken, config.jwt.secret);
    await createDocInDb(Requests, {description, geolocation, isActive: true, userId: payload.userId});

    return res.status(201).json({message: 'Request successful created'});
  } catch (e) {
    return res.status(500)
      .json({message: 'Something went wrong'});
  }
};

module.exports = {
  createRequest,
};
