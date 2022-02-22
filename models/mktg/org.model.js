const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    code: { type: String },
    name: { type: String },
}, {
    timestamps: true,
    collection: 'mktg_orgs'
});

const model = mongoose.model('Org', schema);

module.exports = model;




