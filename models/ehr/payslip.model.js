const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  monthCode: { type: Number },
  monthName: { type: String },
  yearCode: { type: Number },
  empId: { type: Number },
  fname: { type: String },
  lname: { type: String },
  jobTitle: { type: String },
  dept: { type: String },
  baseSalary: { type: Schema.Types.Decimal128 },
  currency: { type: String },
  earning: { type: Schema.Types.Decimal128 },
  lateMins: { type: String },
  earlyMins: { type: String },
  dayPayRate: { type: Schema.Types.Decimal128 },
  hourPayRate: { type: Schema.Types.Decimal128 },
  minPayRate: { type: Schema.Types.Decimal128 },
  workDays: { type: Number },
  workHours: { type: Number },
  workMins: { type: Number },
  ot150: { type: Schema.Types.Decimal128 },
  ot200: { type: Schema.Types.Decimal128 },
  ot250: { type: Schema.Types.Decimal128 },
  ot300: { type: Schema.Types.Decimal128 },
  abDeduct: { type: Number },
  ulDeduct: { type: Number },
  avdDeduct: { type: Schema.Types.Decimal128 },
  oceDeduct: { type: Schema.Types.Decimal128 },
  mymDeduct: { type: Schema.Types.Decimal128 },
  supDeduct: { type: Schema.Types.Decimal128 },
  unfDeduct: { type: Schema.Types.Decimal128 },
  weDeduct: { type: Schema.Types.Decimal128 },
  ssoDeduct: { type: Schema.Types.Decimal128 },
  taxDeduct: { type: Schema.Types.Decimal128 },
  othDeduct: { type: Schema.Types.Decimal128 },
  ytdIncome: { type: Schema.Types.Decimal128 },
  ytdSso: { type: Schema.Types.Decimal128 },
  ytdTax: { type: Schema.Types.Decimal128 },
  totalIncome: { type: Schema.Types.Decimal128 },
  totalDeduct: { type: Schema.Types.Decimal128 }
}, {
  timestamps: true,
  collection: 'ehr_payroll'
});

schema.set('toJSON', {
  transform: (doc, ret) => {
    ret.baseSalary = parseFloat(ret.baseSalary);
    ret.earning = parseFloat(ret.earning);
    ret.dayPayRate = parseFloat(ret.dayPayRate);
    ret.hourPayRate = parseFloat(ret.hourPayRate);
    ret.minPayRate = parseFloat(ret.minPayRate);
    ret.ot150 = parseFloat(ret.ot150);
    ret.ot200 = parseFloat(ret.ot200);
    ret.ot250 = parseFloat(ret.ot250);
    ret.ot300 = parseFloat(ret.ot300);
    ret.avdDeduct = parseFloat(ret.avdDeduct);
    ret.oceDeduct = parseFloat(ret.oceDeduct);
    ret.mymDeduct = parseFloat(ret.mymDeduct);
    ret.supDeduct = parseFloat(ret.supDeduct);
    ret.unfDeduct = parseFloat(ret.unfDeduct);
    ret.weDeduct = parseFloat(ret.weDeduct);
    ret.ssoDeduct = parseFloat(ret.ssoDeduct);
    ret.taxDeduct = parseFloat(ret.taxDeduct);
    ret.othDeduct = parseFloat(ret.othDeduct);
    ret.ytdIncome = parseFloat(ret.ytdIncome);
    ret.ytdSso = parseFloat(ret.ytdSso);
    ret.ytdTax = parseFloat(ret.ytdTax);
    ret.totalIncome = parseFloat(ret.totalIncome);
    ret.totalDeduct = parseFloat(ret.totalDeduct);

    return ret;
  },
});

const model = mongoose.model('Payslip', schema);

module.exports = model;

