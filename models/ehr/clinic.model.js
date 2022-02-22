const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    docNo: { type: String },
    onYear: { type: Number },
    visitedAt: { type: Date },
    empId: { type: Number },
    isSickLeave: { type: Boolean },
    diagnosisNote: { type: String },
    doctorNote: { type: String },
    diseases: { type: String },
    updatedAt: { type: Date }
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'ehr_clinic_records'
});

schema.virtual('child', {
    ref: 'ClinicDetail',
    localField: 'docNo',
    foreignField: 'docNo'
});

const model = mongoose.model('Clinic', schema);

module.exports = model;



