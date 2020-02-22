const mongoose = require('mongoose');
const config = require('../../../config/default');
const jwt = require('jsonwebtoken');
const {deleteOneDocFromDb} = require('../../../db/index');
require('../../../models/index');

const Requests = mongoose.model('Requests');

const deleteRequest = async (req, res) => {
  try {
    const {_id} = req.body;
    const accessToken = req.cookies.accessToken || req.local.accessToken;
    if (!accessToken) {
      return res.status(400).json({message: 'Unauthorized, please log in again'});
    }
    const {userId} = jwt.verify(accessToken, config.jwt.secret);
    await deleteOneDocFromDb(Requests, {userId, _id });

    return res.status(201).json({message: 'Request successful deleted'});
  } catch (e) {
    return res.status(500)
      .json({message: 'Something went wrong'});
  }
};

module.exports = {
  deleteRequest,
};
