const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cacheController = require('./api/controllers/cache');
const app = express();

const port = process.env.PORT || 4200;

mongoose.Promise = global.Promise;

mongoose.connect(config.getDbConnectionString(), { useMongoClient: true });


//Cache api routes
cacheController(app);



app.listen(port);

module.exports = app;

console.log('listening port: ' + port);