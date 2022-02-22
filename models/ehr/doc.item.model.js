const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  mainGroupId: { type: Schema.Types.ObjectId, ref: 'MainDoc', required: true },
  subGroupId: { type: Schema.Types.ObjectId, ref: 'SubDoc', required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  fileSrc: { type: String },
  isVerticalSwipe: { type: Number, default: 0 },
  isActive: { type: Boolean, default: 1 }
}, {
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'ehr_doc_items'
});

schema.virtual('main', {
  ref: 'MainDoc',
  localField: 'mainGroupId',
  foreignField: '_id',
  justOne: true
});

schema.virtual('sub', {
  ref: 'SubDoc',
  localField: 'subGroupId',
  foreignField: '_id',
  justOne: true
});


const model = mongoose.model('ItemDoc', schema);

module.exports = model;

