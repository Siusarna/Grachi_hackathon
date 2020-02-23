const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    geolocation: {
        type: String,
        require: true,
    },
    isActive: {
        type: Boolean,
        require: true,
        default: false,
    }
});

const advisesModel = mongoose.model('Advises', UserSchema);

module.exports = advisesModel;