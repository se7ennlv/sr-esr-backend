const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    orgId: { type: Schema.Types.ObjectId },
    relationship: { type: String },
    code: { type: String },
    leading: { type: String },
    title: { type: String },
    isActive: { type: Boolean, default: 1 }
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'mktg_main_questions'
});

schema.virtual('sub', {
    ref: 'SubQuestion',
    localField: '_id',
    foreignField: 'mainGroupId'
});

schema.virtual('item', {
    ref: 'itemQuestion',
    localField: '_id',
    foreignField: 'subGroupId'
});

const model = mongoose.model('MainQuestion', schema);

module.exports = model;





