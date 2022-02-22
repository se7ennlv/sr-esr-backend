const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    umid: { type: String, default: '' },
    fullName: { type: String, require: true },
    avg: { type: String, default: '=AVERAGE(F3:T3)' },
    q11: { type: Number, default: 0 },
    q211: { type: Number, default: 0 },
    q212: { type: Number, default: 0 },
    q213: { type: Number, default: 0 },
    q214: { type: Number, default: 0 },
    q221: { type: Number, default: 0 },
    q222: { type: Number, default: 0 },
    q223: { type: Number, default: 0 },
    q224: { type: Number, default: 0 },
    q225: { type: Number, default: 0 },
    q311: { type: Number, default: 0 },
    q312: { type: Number, default: 0 },
    q313: { type: Number, default: 0 },
    q321: { type: Number, default: 0 },
    q322: { type: Number, default: 0 },
    q41: { type: String },
    q42: { type: Number, default: 0 },
    q43: { type: String },
    q44: { type: String },
    q45: { type: String },
    surveyAt: { type: Date },
    comment: { type: String }
}, {
    timestamps: true,
    collection: 'mktg_surv_thk'
});


const model = mongoose.model('THK', schema);

module.exports = model;



