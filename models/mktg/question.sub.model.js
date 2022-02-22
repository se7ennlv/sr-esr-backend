const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    mainGroupId: { type: Schema.Types.ObjectId, ref: 'MainQuestion' },
    code: { type: String },
    leading: { type: String },
    title: { type: String },
    isActive: { type: Boolean, default: 1 }
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'mktg_sub_questions'
});

schema.virtual('item', {
    ref: 'ItemQuestion',
    localField: '_id',
    foreignField: 'subGroupId'
});

const model = mongoose.model('SubQuestion', schema);

module.exports = model;





