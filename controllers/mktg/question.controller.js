const mainQuestionModel = require('../../models/mktg/question.main.model');
const subQuestionModel = require('../../models/mktg/question.sub.model');
const itemQuestionModel = require('../../models/mktg/question.item.model');


exports.getAllThkQuestions = async (req, res, next) => {
    try {
        const selectFields = 'code leading title';
        await mainQuestionModel.find({ orgCode: 'THK' }, selectFields)
            .populate({
                path: 'sub',
                select: selectFields,
                options: { sort: { code: 1 } },
                populate: {
                    path: 'item',
                    select: selectFields,
                    options: {
                        sort: { code: 1 }
                    }
                }
            })
            .sort({ code: 1 })
            .then((result) => {
                if (!result) {
                    const error = new Error('No data found!');
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

exports.getAllSrnQuestions = async (req, res, next) => {
    try {
        const selectFields = 'code leading title';
        await mainQuestionModel.find({ orgCode: 'SR', relationship: 'NEW' }, selectFields)
            .populate({
                path: 'sub',
                select: selectFields,
                options: { sort: { code: 1 } },
                populate: {
                    path: 'item',
                    select: selectFields,
                    options: {
                        sort: { code: 1 }
                    }
                }
            })
            .sort({ code: 1 })
            .then((result) => {
                if (!result) {
                    const error = new Error('No data found!');
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

exports.getAllSroQuestions = async (req, res, next) => {
    try {
        const selectFields = 'code leading title';
        await mainQuestionModel.find({ orgCode: 'SR', relationship: 'OLD' }, selectFields)
            .populate({
                path: 'sub',
                select: selectFields,
                options: { sort: { code: 1 } },
                populate: {
                    path: 'item',
                    select: selectFields,
                    options: {
                        sort: { code: 1 }
                    }
                }
            })
            .sort({ code: 1 })
            .then((result) => {
                if (!result) {
                    const error = new Error('No data found!');
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


