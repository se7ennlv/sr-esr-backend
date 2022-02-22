const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  title: { type: String },
  desc: { type: String },
  fileSrc: { type: String},
  publishedDate: { type: Date },
  expiryDate: { type: Date },
  isFirstPopup: { type: Boolean, default: 1 },
  isActive: { type: Boolean, default: 1 }
}, {
  timestamps: true,
  collection: 'mktg_promotions',
  versionKey: false
});

const model = mongoose.model('Promotion', schema);

module.exports = model;


