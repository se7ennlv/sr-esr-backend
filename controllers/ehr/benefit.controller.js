const srpModel = require('../../models/ehr/srp.model');
const mymartModel = require('../../models/ehr/mymart.model');
const leaveModel = require('../../models/ehr/leave.model');
const rosterModel = require('../../models/ehr/attendance.model');
const clinicModel = require('../../models/ehr/clinic.model');
const clnDetailModel = require('../../models/ehr/clinic.detail.model');
const mySurveyModel = require('../../models/ehr/mysurvey.model');

const { isValidObjectId } = require('mongoose');


exports.getSRP = async (req, res, next) => {
    try {
        const empId = req.user.empId;
        const sum = await srpModel.aggregate([
            { "$match": { "empId": empId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$reqScore" }
                }
            }
        ]);

        const records = await srpModel.find({ empId: empId }, '-_id');
        if (!records) {
            const error = new Error('No data found!');
            error.statusCode = 404;
            throw error;
        }

        let totalScore = 0;
        if (sum.length > 0) {
            totalScore = parseFloat(sum[0].total.toString());
        }

        return res.status(200).json({
            status: 'success',
            sum: totalScore,
            data: records
        });
    } catch (error) {
        next(error);
    }
}

exports.getMyMart = async (req, res, next) => {
    try {
        const empId = req.user.empId;
        const sum = await mymartModel.aggregate([
            { "$match": { "empId": empId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalCredit" }
                }
            }
        ]);

        const records = await mymartModel.find({ empId: empId }, '-_id');
        let totalCredit = 0;

        if (sum.length > 0) {
            totalCredit = parseFloat(sum[0].total.toString());
        }

        const balance = (1000 - totalCredit);

        if (!records) {
            const error = new Error('No data found!');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            status: 'success',
            sum: totalCredit,
            balance: balance,
            data: records
        });
    } catch (error) {
        next(error);
    }
}

exports.getLeave = async (req, res, next) => {
    try {
        const empId = req.user.empId;
        const result = await leaveModel.find({ empId: empId }, '-_id');

        if (!result || result.length <= 0) {
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

exports.getRoster = async (req, res, next) => {
    try {
        const empId = req.user.empId;;
        const result = await rosterModel.find({ empId: empId }, '-_id').sort({ workday: 'desc' });

        if (!result || result.length <= 0) {
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

exports.getAllMyClinicRecords = async (req, res, next) => {
    try {
        const empId = req.user.empId;
        const year = req.params.y;

        await clinicModel.find({ empId: empId, onYear: year }, '-_id')
            .populate('child', '-_id -empId').then((result) => {
                if (!result) {
                    const error = new Error('No data found.');
                    error.statusCode = 404;
                    throw error;
                }

                return res.status(200).json({
                    status: 'success',
                    data: result
                });
            });
    } catch (error) {
        next(error);
    }
}

exports.getAllMySurveys = async (req, res, next) => {
    try {
        const empId = req.user.empId;
        const year = req.params.y;

        const selectFields = 'topic url';
        await mySurveyModel.find({ empId: empId, onYear: year })
            .populate('child', selectFields).then((result) => {
                if (!result) {
                    const error = new Error('No data found!');
                    error.statusCode = 404; l
                    throw error;
                }

                return res.status(200).json({
                    status: 'success',
                    data: result
                });
            });
    } catch (error) {
        next(error);
    }
}

exports.updateMySurvey = async (req, res, next) => {
    try {
        const id = req.body.docId;

        if (isValidObjectId(id)) {
            const result = await mySurveyModel.updateOne({ _id: id }, {
                isSubmitted: 1,
            });

            if (result.nModified === 0) {
                const error = new Error('Error Occurred');
                error.statusCode = 500;
                throw error;
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'Updated'
                });
            }
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Invalid ObjectId'
            });
        }
    } catch (error) {
        next(error);
    }
}

