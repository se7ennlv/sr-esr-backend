const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    __v: { type: Number, select: false },
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
    empId: { type: Number, required: true },
    empName: { type: String, required: true },
    dept: { type: String, required: true },
    onYear: { type: Number, required: true },
    isSubmitted: { type: Boolean, default: 0 },
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'ehr_survey_records'
});

schema.virtual('child', {
    ref: 'Survey',
    localField: 'surveyId',
    foreignField: '_id',
    justOne: true
});

const model = mongoose.model('MySurvey', schema);

module.exports = model;


