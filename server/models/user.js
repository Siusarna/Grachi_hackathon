const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    min: 4,
  },
  lastName: {
    type: String,
    require: true,
    min: 4,
  },
  fatherName: {
    type: String,
    require: true,
    min: 4,
  },
  password: {
    type: String,
    require: true,
    min: 8,
    max: 1024,
  },
  phones: {
    type: Number,
    require: true,
    min: 9,
    max: 11,
  },
  achievements: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievements',
    require: true,
  },
  inBlackList: {
    type: Boolean,
    require: true,
    default: false,
  },
  isActive: {
    type: Boolean,
    require: true,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  secretKeyForVerifyPhones: {
    type: String,
  },
});

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
