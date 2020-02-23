const mongoose = require('mongoose');

const AchievementsSchema = new mongoose.Schema({
  description: {
    type: String,
    max: 1024,
    require: true,
  },
  name:{
    type: String,
    max: 100,
    require: true
  },
  isActive:{
    type: Boolean,
    require: true,
    default: true,
  }
});

const achievementsModel = mongoose.model('Achievements', AchievementsSchema);

module.exports = achievementsModel;
