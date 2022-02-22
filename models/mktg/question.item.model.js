const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    subGroupId: { type: Schema.Types.ObjectId, ref: 'SubQuestion' },
    code: { type: String },
    leading: { type: String },
    title: { type: String },
    isActive: { type: Boolean, default: 1 }
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'mktg_item_questions'
});

const model = mongoose.model('ItemQuestion', schema);

module.exports = model;





