const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    docNo: { type: String },
    empId: { type: Number },
    totalCredit: { type: Schema.Types.Decimal128 },
    tranDate: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true,
    collection: 'ehr_mymart',
    versionKey: false
});

schema.set('toJSON', {
    transform: (doc, ret) => {
        ret.totalCredit = parseFloat(ret.totalCredit);
        return ret;
    },
});

const model = mongoose.model('MyMart', schema);

module.exports = model;

