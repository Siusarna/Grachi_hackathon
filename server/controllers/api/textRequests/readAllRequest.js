const mongoose = require('mongoose');
const config = require('../../../config/default');
const {readDocsFromDb} = require('../../../db/index');
require('../../../models/index');

const Requests = mongoose.model('Requests');

function measure (userLat, userLon, dbLat, dbLon) {  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = dbLat * Math.PI / 180 - userLat * Math.PI / 180;
  const dLon = dbLon * Math.PI / 180 - userLon * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLat * Math.PI / 180) * Math.cos(dbLat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000 <= config.geolocationRadius; // meters
}

const readAllRequest = async (req, res) => {
  try {
    const {latitude, longitude} = req.body;

    const requests = await readDocsFromDb(Requests,{}, 'user');
    const filteredList = requests.filter(el => {
      const parsedElement = JSON.parse(el.geolocation);
      return measure(latitude, longitude, Number(parsedElement.latitude), Number(parsedElement.longitude));
    });

    return res.status(201).json(filteredList);
  } catch (e) {
    console.log(e);
    return res.status(500)
      .json({message: 'Something went wrong'});
  }
};

module.exports = {
  readAllRequest,
};
