const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    empId: { type: Number, required: true },
    empName: { type: String, required: true },
    dept: { type: String, required: true },
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
    status: { type: Number, default: 0 },
    onYear: { type: Number, required: true}
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

const model = mongoose.model('SurveyRecord', schema);

module.exports = model;


