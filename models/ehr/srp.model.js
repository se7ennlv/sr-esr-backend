const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    docNo: { type: String },
    empId: { type: Number },
    reqScore: { type: Schema.Types.Decimal128 },
    hodComment: { type: String },
    requester: { type: Date },
    reqAt: { type: Date },
    approvedAt: { type: Date },
    expiryIn: { type: Date }
}, {
    timestamps: true,
    collection: 'ehr_srp'
});

schema.set('toJSON', {
    transform: (doc, ret) => {
        ret.reqScore = parseFloat(ret.reqScore);
        return ret;
    },
});

const model = mongoose.model('SRP', schema);

module.exports = model;

