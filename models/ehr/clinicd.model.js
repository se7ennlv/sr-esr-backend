const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    docNo: [{ type: String, ref: 'Clinic' }],
    medCode: { type: String },
    medName: { type: String },
    qtyUsed: { type: Number },
    updatedAt: { type: Date}
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'ehr_clinic_details'
});

const model = mongoose.model('Detail', schema);

module.exports = model;

