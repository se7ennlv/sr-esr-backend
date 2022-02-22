const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    umid: { type: String, default: '' },
    fullName: { type: String, require: true },
    avg: { type: String, default: '=AVERAGE(F3:T3)' },
    q111: { type: Number, default: 0 },
    q112: { type: Number, default: 0 },
    q113: { type: Number, default: 0 },
    q121: { type: Number, default: 0 },
    q122: { type: Number, default: 0 },
    q123: { type: Number, default: 0 },
    q131: { type: Number, default: 0 },
    q132: { type: Number, default: 0 },
    q133: { type: Number, default: 0 },
    q141: { type: Number, default: 0 },
    q211: { type: Number, default: 0 },
    q212: { type: Number, default: 0 },
    q213: { type: Number, default: 0 },
    q221: { type: Number, default: 0 },
    q222: { type: Number, default: 0 },
    q223: { type: Number, default: 0 },
    q31: { type: String },
    q321: { type: String },
    q322: { type: String },
    q323: { type: String },
    q324: { type: String },
    q41: { type: String },
    q42: { type: String },
    q43: { type: String },
    q44: { type: String },
    q51: { type: Number, default: 0 },
    q52: { type: Number, default: 0 },
    q53: { type: Number, default: 0 },
    q54: { type: Number, default: 0 },
    q55: { type: Number, default: 0 },
    q56: { type: String },
    surveyAt: { type: Date },
    comment: { type: String }
}, {
    timestamps: true,
    collection: 'mktg_surv_srn'
});


const model = mongoose.model('SRN', schema);

module.exports = model;






