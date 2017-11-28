const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const cacheController = require('../api/controllers/cache');
const app = express();

const assert = require('assert');


const port = process.env.PORT || 4200;

mongoose.Promise = global.Promise;

mongoose.connect(config.getDbTestingString(), {useMongoClient: true});

//Cache api routes
cacheController(app);


app.listen(port);

describe('Cache Controller', () => {

    let value;

    it('should create a document with the provided key', (done) => {
        request(app)
            .get('/cache/get/test1')
            .expect(201)
            .end((err, res) => {
                value = res.body.value;
                assert.equal(res.body.key, "test1");

                if (err) throw new Error(err);
                done()
            })
    });

    it('should bring the document with the provided key and same value', (done) => {
        request(app)
            .get('/cache/get/test1')
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.key, "test1");
                assert.equal(res.body.value, value);

                if (err) throw new Error(err);
                done()
            })
    });


    it('should create the document with the provided key', (done) => {
        request(app)
            .post('/cache')
            .send({key: "test2"})
            .expect(201)
            .end((err, res) => {
                assert.equal(res.body.key, "test2");
                if (err) throw new Error(err);
                done()
            })
    });

    it('should get 2 keys', (done) => {
        request(app)
            .get('/cache/getKeys')
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.length, 2);

                if (err) throw new Error(err);

                done()
            })
    });


    it('should delete the created document', (done) => {
        request(app)
            .delete('/cache')
            .send("key", "test2")
            .expect(200)
            .end((err, res) => {
                if (err) throw new Error(err);
                done()
            })
    });


    it('should delete all cache collection', (done) => {
        request(app)
            .delete('/cache/')
            .expect(200)
            .end((err, res) => {
                if (err) throw new Error(err);
                done()
            })
    });

});
