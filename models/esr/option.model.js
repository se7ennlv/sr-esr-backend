const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = Schema({
    optionName: { type: String },
    optionValue: { type: Schema.Types.Mixed },
}, {
    timestamps: true,
    collection: 'esr_options'
});


const model = mongoose.model('Option', schema);

module.exports = model;
