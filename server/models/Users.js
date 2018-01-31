const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email       : {type: String, required: true},
    name        : {type: String, required: true},
    createdAt   : {type: Date},
    lastVisit   : {type: Date},
    lastAction  : {type: Date}
});

module.exports = mongoose.model('User', userSchema);
