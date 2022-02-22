const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  mainGroupId: { type: Schema.Types.ObjectId, ref: 'MainDoc' },
  leading: { type: String, default: null },
  title: { type: String, required: true },
  subtitle: { type: String, default: null },
  trailing: { type: String, default: null },
  orderIndex: { type: Number },
  isDefault: { type: Boolean, default: 0 },
  isActive: { type: Boolean, default: 1 }
}, {
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'ehr_doc_sub'
});

schema.virtual('items', {
  ref: 'ItemDoc',
  localField: '_id',
  foreignField: 'subGroupId'
});

schema.virtual('main', {
  ref: 'MainDoc',
  localField: 'mainGroupId',
  foreignField: '_id',
  justOne: true
});


const model = mongoose.model('SubDoc', schema);

module.exports = model;

