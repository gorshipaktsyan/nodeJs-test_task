const mongoose = require("mongoose");
const config = require('../etc/config.json');

class Db {
    
    constructor() {
        mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    }

}

module.exports = new Db();
