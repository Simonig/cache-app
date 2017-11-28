const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cacheSchema = new Schema({
    key: {type: String, unique: true},
    value: String,
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

const Cache = mongoose.model('Cache', cacheSchema);

module.exports = Cache;