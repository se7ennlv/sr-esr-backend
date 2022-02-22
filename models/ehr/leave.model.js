const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    empId: { type: Number },
    leaveCode: { type: String },
    leaveDesc: { type: String },
    leaveDay: { type: Number },
    gender: { type: Number },
    updatedAt: { type: Date}
}, {
    timestamps: true,
    collection: 'ehr_leaves'
});

const model = mongoose.model('Leave', schema);

module.exports = model;

