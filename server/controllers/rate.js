const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {
    readDocsFromDb,
    createConnection,
    updateOneDocInDb,
    createDocInDb,
    readOneDocFromDb
} = require('../db/index');

require('../models/index');

const Rate = mongoose.model('Rate');
const Users = mongoose.model('User'); 

const update_rate = async(req, res) => {
    try{
        await createConnection();
        const accessToken = req.cookies.accessToken || req.local.accessToken;
        if(!accessToken){
            return res.status(400).json({message: 'Unauthorized, pleased log in again'});
        }
        const payload = jwt.verify(accessToken, config.jwt.secret);
        const data = {
            userId: payload.userId
        }
        const points_current = (await readOneDocFromDb(Rate, data)).points;
        const points = { 
            points: Number(req.points) + Number(points_current)
        };
        updateOneDocInDb(Rate, data, points)
        return res.json({points: points})
    }
    catch(error){
        console.log(error)
        return res.status(500)
        .json({ message: 'Something went wrong' });
    }
}

const init_rate = async(req, res) => {
    try{
        await createConnection()
        const accessToken = req.cookies.accessToken || req.local.accessToken;
        if(!accessToken){
            return res.status(400).json({message: 'Unauthorized, pleased log in again'});
        }
        const payload = jwt.verify(accessToken, config.jwt.secret);
        const data = {
            userId: payload.userId
        }
        createDocInDb(Rate, data);
        return res.send('ok')
    }
    catch(error){
        return res.status(500)
        .json({ message: 'Something went wrong' });
    }
}

const check_rate = async(req, res) => {
    try{
        await createConnection();
        const accessToken = req.cookies.accessToken || req.local.accessToken;
        if(!accessToken){
            return res.status(400).json({message: 'Unauthorized, pleased log in again'});
        }
        const payload = jwt.verify(accessToken, config.jwt.secret);
        data ={
            userId: payload.userId
        }
        const negative_points = -50;
        const points_current = (await readOneDocFromDb(Rate, data)).points;
        if(Number(points_current) <= negative_points){
            updateOneDocInDb(Users, data, {inBlackList: true})
            return res.json({ message: "User in blacklist"})
        }
        return res.send('ok');
    }
    catch(error){
        return res.status(500)
        .json({ message: 'Something went wrong' });
    }
}

const show_rate = async(req, res) => {
    try{
        await createConnection();
        const accessToken = req.cookies.accessToken || req.local.accessToken;
        if(!accessToken){
            return res.status(400).json({message: 'Unauthorized, pleased log in again'});
        }
        const payload = jwt.verify(accessToken, config.jwt.secret);
        data = {
            userId: payload.userId
        }
        const points_current = (await readOneDocFromDb(Rate, data)).points;
        return res.json({points: points_current})
    }
    catch(error){
        return res.status(500)
        .json({ message: 'Something went wrong' });
    }
}
const show_rates = async(req, res) => {
    try{
        await createConnection();
        const rate = (await readDocsFromDb(Rate, {}))
        const list = []
        
        rate.forEach(element => {
            let userId = {
                userId: element.userId
            }
            let user = (await readOneDocFromDb(Users, userId));
            list.push({'user': user, 'point': Number(element.points)});
        });
        list.sort(function(a, b) { 
            if (a.point > b.point) { 
              return -1; } 
            if (a.point < b.point) { 
              return 1; } 
            return 0; 
          });
        
        return res.json({rate: list})
    }
    catch(error){
        return res.status(500)
        .json({ message: 'Something went wrong' });
    }
}

module.exports = {
    update_rate,
    init_rate,
    check_rate,
    show_rate,
    show_rates
}
