const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = Schema({
    srDesc: { type: String },
    srImage: { type: String },
    srVdoSrc: { type: String },
    thsDesc: { type: String },
    thsImage: { type: String }
}, {
    timestamps: true,
    collection: 'esr_about'
});


const model = mongoose.model('About', schema);

module.exports = model;
