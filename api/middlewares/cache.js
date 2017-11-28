const Cache = require('../schemas/cacheSchema');
const randomString = require('../helpers/Common').randomString;




module.exports.validateDate = function (req, res, next) {

    let oneWeekAgo = new Date();

    //cache older than one week will be updated with a random string

    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    Cache.update({updated_at: {$lte: oneWeekAgo}}, {value: randomString()}, {multi: true}, (err, _) => {
        if (err) return next(err);
        next();

    })

};

module.exports.validateCount = function (req, res, next) {

    //Cache limit allowed
    const cacheLimit = 10;



    Cache.count({}, (err, count) => {
        req.validCount = count <= cacheLimit;

        next();
    })

};
