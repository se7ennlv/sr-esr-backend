const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    workday: { type: Date },
    empId: { type: Number },
    shiftCode: { type: String },
    shiftStart: { type: String },
    shiftEnd: { type: String },
    firstCheckIn: { type: Date },
    lastCheckOut: { type: Date },
    latecheckIn: { type: String },
    earlyCheckOut: { type: String },
    updatedAt: { type: Date}
}, {
    timestamps: false,
    collection: 'ehr_attendance'
});

const model = mongoose.model('Attendance', schema);

module.exports = model;
