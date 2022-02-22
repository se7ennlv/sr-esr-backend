const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const schema = Schema({
  username: { type: String, required: true, unique: true, trim: true, index: true },
  password: { type: String, required: true, trim: true },
  fileSrc: { type: String, default: null },
  empId: { type: Number, required: true },
  fname: { type: String, required: true },
  lname: { type: String },
  fullName: { type: String },
  gender: { type: String, required: true },
  deptId: { type: Number },
  deptName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  tel: { type: String },
  email: { type: String, unique: true },
  hiringDate: { type: Date, required: true },
  passwordUpdatedAt: { type: Date, default: null },
  role: {
    id: { type: Number, default: 4 },
    name: { type: String, default: 'Employee' }
  },
  isActive: { type: Boolean, default: 1 }
}, {
  timestamps: true,
  collection: 'esr_users'
});

schema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(8);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

schema.methods.checkPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
}

const model = mongoose.model('User', schema);

module.exports = model;
