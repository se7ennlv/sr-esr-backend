const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    workday: { type: Date },
    empId: { type: String },
    shiftCode: { type: String },
    shiftStart: { type: String },
    shiftEnd: { type: String },
    firstCheckIn: { type: Date },
    lastCheckOut: { type: Date },
    lateCheckIn: { type: String },
    earlyCheckOut: { type: String },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: false,
    collection: 'ehr_attendance'
});

const roster = mongoose.model('Roster', schema);

module.exports = roster;
