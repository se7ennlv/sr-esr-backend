const mainQuestionModel = require('../../models/mktg/question.main.model');
const subQuestionModel = require('../../models/mktg/question.sub.model');
const playerModel = require('../../models/mktg/player.model');
const mySurveyModel = require('../../models/ehr/mysurvey.model');
const rosterModel = require('../../models/ehr/roster.model');
const srpModel = require('../../models/ehr/srp.model');
const clinicModel = require('../../models/ehr/clinic.model');
const clinicDetailModel = require('../../models/ehr/clinicd.model');
const promotionModel = require('../../models/mktg/promotion.model');
const userModel = require('../../models/esr/user.model');
const userAppModel = require('../../models/esr/user.app.model');
const payrollModel = require('../../models/ehr/payslip.model');



exports.findAllDocs = async (req, res, next) => {
    try {
        const result = await subQuestionModel.find({ mainGroupId: '6045b40650b3ec56ec5d3e8f' });
        if (!result) {
            const error = new Error('No data found!');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        next(error);
    }
}


exports.delAllDocs = async (req, res, next) => {
    try {
        const whereCond = {yearCode: 2021, monthCode: 2};

        await payrollModel.remove(whereCond, (err, doc) => {
            if (err) {
                const error = new Error('Error!');
                error.statusCode = 500;
                throw error;
            } else {
                return res.status(200).json({
                    status: 'success',
                    data: 'Deleted'
                });
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.renameCollection = async (req, res, next) => {
    try {
        db.collection('test').rename('foobar');
    } catch (error) {
        next(error);
    }
}
