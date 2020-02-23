const mongoose = require('mongoose');

const RequestsSchema = new mongoose.Schema({
  description: {
    type: String,
    max: 1024,
    require: true,
  },
  geolocation: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
    default: false,
  },
  waitingTime: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const requestsModel = mongoose.model('Requests', RequestsSchema);

module.exports = requestsModel;
