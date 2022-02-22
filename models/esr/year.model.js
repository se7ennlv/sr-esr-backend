const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    yearCode: { type: Number, required: true },
    desc: { type: String },
}, {
    timestamps: true,
    collection: 'esr_fiscal_years'
});

const model = mongoose.model('FiscalYear', schema);

module.exports = model;

