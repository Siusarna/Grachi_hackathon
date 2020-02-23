const mongoose = require('mongoose');
const {createDocInDb} = require('../../../db/index');
require('../../../models/index');

const Achievements = mongoose.model('Achievements');

const createAchievements = async (req, res) => {
  try {
    const {description, name} = req.body;

    await createDocInDb(Achievements, {description, name});

    return res.status(201).json({message: 'Achievements successful created'});
  } catch (e) {
    console.log(e);
    return res.status(500)
      .json({message: 'Something went wrong'});
  }
};

module.exports = {
  createAchievements,
};
