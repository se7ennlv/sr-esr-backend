const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = Schema({
    topic: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: Number, default: 1 },
    isActive: { type: Boolean, default: 1 }
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'ehr_surveys'
});

const model = mongoose.model('Survey', schema);

module.exports = model;


