const configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return `mongodb://${configValues.uname}:${configValues.pwd}@ds117156.mlab.com:17156/cache`;
    },

    getDbTestingString: function() {
        return `mongodb://${configValues.uname}:${configValues.pwd}@ds123146.mlab.com:23146/cachetesting`;
    }

};