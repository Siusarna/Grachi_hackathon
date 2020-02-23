
const config = require('../../../config/default');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {
    createConnection,
    readDocsFromDb,
    createDocInDb,
} = require('../../../db/index');

require('../../../models/index');

const Advises = mongoose.model('Advises');
const Create_Adv = async(req, res) => {
    try{
        await createConnection();
        const accessToken = req.cookies.accessToken || req.local.accessToken;
        if(!accessToken){
            return res.status(400).json({message: 'Unauthorized, pleased log in again'});
        }
        const payload = jwt.verify(accessToken, config.jwt.secret);
        data = {
            userId: payload.userId,
            description: req.description,
            geolocation:  JSON.stringify({ latitude: req.geo.latitude, longitude: req.geo.longitude})
        }
        await createDocInDb(Advises, data);
        console.log("done")
    }
    catch(error){
        return res.status(500)
        .json({ message: 'Something went wrong' }); 
    }
}

const Read_Adv = async(req, res) => {
    try{
        await createConnection();
        const accessToken = req.cookies.accessToken || req.local.accessToken;
        if(!accessToken){
            return res.status(400).json({message: 'Unauthorized, pleased log in again'});
        }
        const geo = {
            latitude: req.geo.latitude,
            longitude: req.geo.longitude
        }
        console.log("!")
        const list = (await readDocsFromDb(Advises, {}));
        const result = []
        list.forEach(element => {
            console.log(element)
            if(measure(geo.latitude, geo.longitude, JSON.parse(list.geo).latitude, JSON.parse(list.geo).longitude)){
                result.push(element)
            }
                
        });
        return res.json({list: result})
    }
    catch(error){
        return res.status(500)
        .json({ message: 'Something went wrong' });
    }
}
/*
const Update_Adv = async(req, res) => {
    try{
        await createConnection();
        data = {
            userId: req.userId
        }
        const change = {
            description: req.description
        }
        updateOneDocInDb(Advises, data, change);
        console.log("done")
    }
    catch(error){
        return res.status(500)
        .json({ message: 'Something went wrong' });
    }
}

const Delete_Adv = async(req, res) => {
    try{
        await createConnection();
        const data = {
            userId: req.userId
        }
        deleteOneDocFromDb(Advises, data)
    }
    catch(error){
        return res.status(500)
      .json({ message: 'Something went wrong' });
    }
}*/

const measure = (lat1, lon1, lat2, lon2) => {  // generally used geo measurement function
    const R = 6378.137; // Radius of earth in KM
    const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d * 1000 <= config.geolocationRadius; // meters
}

module.exports = {
    Create_Adv,
    Read_Adv
}
