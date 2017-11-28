const services = require('../services/services')();
const bodyParser = require('body-parser');

const {validateDate, validateCount} = require('../middlewares/cache');


module.exports = function (app) {

    app.use(bodyParser.json());


    app.get('/cache/get/:key', validateDate, validateCount, function (req, res) {
        const key = req.params.key;
        const validCount = req.validCount;


        services.cacheService.getByKey(key, validCount)
            .then(function (response) {

                res.status(response.status).send(response.data)
            }, function (err) {
                res.status(400).json(err);
            })

    });

    app.delete('/cache/:key', function (req, res) {

        const key = req.params.key;

        services.cacheService.deleteByKey(key)
            .then(function (result) {
                if(result === 0) res.status(404).send(`key ${key} not found`)

                res.status(200).send(`key ${key} deleted`)

            }, function (err) {
                res.status(400).json(err);
            })

    });


    app.post('/cache', validateCount, function (req, res) {

        if(!req.body.key) res.status(400).send("please provide a key");

        const key = req.body.key;
        const validCount = req.validCount;

        services.cacheService.createOrUpdate(key, validCount)
            .then(function (response) {
                res.status(response.status).send(response.data)
            }, function (err) {
                res.status(400).json(err);
            })

    });

    app.get('/cache/getKeys', validateDate, function (req, res) {

        services.cacheService.getKeys()
            .then(function (response) {
                res.send(response)
            }, function (err) {
                res.status(400).json(err);
            })

    });

    app.delete('/cache', function (req, res) {
        services.cacheService.deleteAll()
            .then(function (response) {

                res.send(`${response} keys deleted`)
            }, function (err) {
                res.status(400).json(err);
            })

    });


};