const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    umid: { type: String, default: '' },
    fileSrc: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, default: '' },
    fullName: { type: String },
    orgId: { type: Schema.Types.ObjectId, required: true, ref: 'Org' },
    levelId: { type: Schema.Types.ObjectId, required: true, ref: 'Level' },
    rolling: { type: Number, default: 0 },
    winLoss: { type: Number, default: 0 },
    gender: { type: String, required: true },
    tel: { type: String, default: '' },
    address: { type: String, default: '' },
    relationship: { type: String, required: true },
    isActive: { type: Boolean, default: 1 }
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'mktg_players'
});

schema.virtual('org', {
    ref: 'Org',
    localField: 'orgId',
    foreignField: '_id',
    justOne: true
});

schema.virtual('level', {
    ref: 'Level',
    localField: 'levelId',
    foreignField: '_id',
    justOne: true
});

const model = mongoose.model('Player', schema);

module.exports = model;


