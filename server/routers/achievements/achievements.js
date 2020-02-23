const achievements = require('../../controllers/api/achievements/index');

module.exports = (app) => {
  app.post('/api/achievements/createAchievements', achievements.createAchievements);
};
