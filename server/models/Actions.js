const mongoose = require('mongoose');

const { Schema } = mongoose;

const actionsSchema = new Schema({
    userId     : {type: String, required: true},
    type       : {type: String, required: true},
    message    : {type: String, required: true},
    author     : {type: String, required: true},
    createdAt  : {type: Date}
});

module.exports = mongoose.model('Actions', actionsSchema);
