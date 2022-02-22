const mainDocModel = require('../../models/ehr/doc.main.model');
const subDocModel = require('../../models/ehr/doc.sub.model');
const itemDocModel = require('../../models/ehr/doc.item.model');
const { isValidObjectId } = require('mongoose');


exports.getMainDocs = async (req, res, next) => {
    try {
        await mainDocModel.find({ isActive: 1 })
            .sort({ orderIndex: 1 })
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

exports.getAllSubAndItemDocs = async (req, res, next) => {
    try {
        const mainGroupId = req.params.id;

        if (isValidObjectId(mainGroupId)) {
            await subDocModel.find({ mainGroupId: mainGroupId, isActive: 1 })
                .populate({
                    path: 'items',
                    match: { isActive: 1 },
                    options: {
                        sort: '-title'
                    }
                })
                .sort({ orderIndex: 1 })
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
        } else {
            const error = new Error('No data found!');
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}