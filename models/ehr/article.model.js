const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  topic: { type: String },
  desc: { type: String },
  fileSrc: { type: String},
  publishedAt: { type: Date },
  isActive: { type: Boolean, default: 1 }
}, {
  timestamps: true,
  collection: 'ehr_articles',
  versionKey: false
});

const model = mongoose.model('Article', schema);

module.exports = model;


