const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    monthCode: { type: Number },
    monthName: { type: String },
    desc: { type: String }
}, {
    timestamps: true,
    collection: 'ehr_months'
});

const model = mongoose.model('Month', schema);

module.exports = model;

