const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    orgCode: { type: String },
    relationship: { type: String },
    questionNumber: { type: String },
    optValue: { type: String },
    optText: { type: String }
}, {
    timestamps: true,
    collection: 'mktg_answers'
});

const model = mongoose.model('Answers', schema);

module.exports = model;






