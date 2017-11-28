const Q = require('q');
const Cache = require('../schemas/cacheSchema');
const randomString = require('../helpers/Common').randomString;
const Logger = require('../helpers/Logger');

const _ = require('lodash');

function CacheService() {

    CacheService.getByKey = function (key, validCount) {
        const deferred = Q.defer();


        Cache.findOne({key}, (err, doc) => {
            if (err) deferred.reject(err);

            if (!doc) {
                const value = randomString();

                Logger.info('Cache miss');

                if (validCount) {

                    // if the count of cache is valid it will create a new one

                    const newCache = new Cache({key, value});

                    newCache.save((err) => {
                        if (err) deferred.reject(err);

                        deferred.resolve({data: {value, key}, status: 201})
                    })

                } else {

                    //if the count is not valid update older cache in the collection
                    Cache.findOne({}, {}, {sort: {'updated_at': 1}}, function (err, doc) {
                        doc.key = key;
                        doc.value = value;
                        doc.save((err) => {
                            if (err) deferred.reject(err);

                            deferred.resolve({data: {value, key}, status: 201})
                        })

                    });
                }

            } else {

                // If the search find the doc just return
                Logger.info('Cache hit');

                deferred.resolve({data: {key, value: doc.value}, status: 200});

            }

        });

        return deferred.promise;

    };

    CacheService.createOrUpdate = function (key) {
        const deferred = Q.defer();

        Cache.findOne({key}, (err, doc) => {
            if (err) deferred.reject(err);
            let status;

            if (doc) {
                doc.value = randomString();
                status = 200

            } else {

                //if we don't find a  document we create one
                doc = new Cache({key, value: randomString()})
                status = 201
            }

            doc.save((err) => {
                if (err) deferred.reject(err);
                deferred.resolve({data: {key, value: doc.value}, status})
            })
        });

        return deferred.promise;

    };


    CacheService.deleteByKey = function (key) {
        const deferred = Q.defer();

        Cache.remove({key}, (err, doc) => {

            if (err) deferred.reject(err);

            deferred.resolve(doc.result.n)

        });

        return deferred.promise;

    };

    CacheService.getKeys = function () {

        const deferred = Q.defer();

        Cache.find().select({key: 1, _id: 0}).exec((err, docs) => {
            if (err) deferred.reject(err);

            const keys = _.map(docs, obj => {
                return obj.key
            });

            deferred.resolve(keys);
        });

        return deferred.promise
    };


    CacheService.deleteAll = function () {

        const deferred = Q.defer();

        Cache.remove({}, (err, response) => {
            if (err) deferred.reject(err);

            deferred.resolve(response.result.n);
        });

        return deferred.promise
    };


    return CacheService;
}


module.exports = CacheService;