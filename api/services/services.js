const CacheService = require('./CacheService');



function Services() {
    const services = {};

    services.cacheService = new CacheService();


    return services;
}


module.exports = Services;