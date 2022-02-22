const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    name: { type: String },
}, {
    timestamps: true,
    collection: 'mktg_player_levels'
});

const model = mongoose.model('Level', schema);

module.exports = model;




