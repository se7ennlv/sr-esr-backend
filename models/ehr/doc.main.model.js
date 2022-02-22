const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  wLeading: { type: String, default: 'pi pi-chevron-right' },
  mLeading: { type: String, default: '0xe7d9' },
  title: { type: String },
  subtitle: { type: String },
  trailing: { type: String },
  orderIndex: { type: Number },
  isDefault: { type: Boolean, default: 0 },
  isActive: { type: Boolean, default: 1 }
}, {
  timestamps: true,
  collection: 'ehr_doc_main'
});

const model = mongoose.model('MainDoc', schema);

module.exports = model;


