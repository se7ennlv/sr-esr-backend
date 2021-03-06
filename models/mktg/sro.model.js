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
    q13: { type: String },
    q141: { type: String },
    q142: { type: String },
    q151: { type: Number, default: 0 },
    q152: { type: Number, default: 0 },
    q153: { type: Number, default: 0 },
    q161: { type: Number, default: 0 },
    q162: { type: Number, default: 0 },
    q163: { type: Number, default: 0 },
    q171: { type: Number, default: 0 },
    q211: { type: Number, default: 0 },
    q212: { type: Number, default: 0 },
    q213: { type: Number, default: 0 },
    q221: { type: Number, default: 0 },
    q222: { type: Number, default: 0 },
    q223: { type: Number, default: 0 },
    q231: { type: Number, default: 0 },
    q232: { type: Number, default: 0 },
    q233: { type: Number, default: 0 },
    q241: { type: Number, default: 0 },
    q242: { type: Number, default: 0 },
    q243: { type: Number, default: 0 },
    q251: { type: Number, default: 0 },
    q252: { type: Number, default: 0 },
    q253: { type: Number, default: 0 },
    q261: { type: Number, default: 0 },
    q262: { type: Number, default: 0 },
    q263: { type: Number, default: 0 },
    q271: { type: Number, default: 0 },
    q272: { type: Number, default: 0 },
    q273: { type: Number, default: 0 },
    q281: { type: Number, default: 0 },
    q282: { type: Number, default: 0 },
    q283: { type: Number, default: 0 },
    q284: { type: Number, default: 0 },
    q285: { type: Number, default: 0 },
    q286: { type: Number, default: 0 },
    q287: { type: Number, default: 0 },
    q288: { type: Number, default: 0 },
    q29: { type: String },
    q31: { type: String },
    q32: { type: String },
    q33: { type: String },
    q341: { type: Number, default: 0 },
    q351: { type: Number, default: 0 },
    q352: { type: Number, default: 0 },
    q353: { type: Number, default: 0 },
    q354: { type: Number, default: 0 },
    q41: { type: String },
    q42: { type: Number, default: 0 },
    q43: { type: String },
    q44: { type: String },
    q45: { type: String },
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
    collection: 'mktg_surv_sro'
});


const model = mongoose.model('SRO', schema);

module.exports = model;


