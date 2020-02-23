const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    points: {
        type: Number,
        require: true,
        default: 0,
    },
});
const rateModel = mongoose.model("Rate", UserSchema);

module.exports = rateModel;
    