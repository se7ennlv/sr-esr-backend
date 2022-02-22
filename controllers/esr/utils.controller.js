const aboutModel = require('../../models/esr/about.model');
const monthModel = require('../../models/esr/month.model');
const fiscalYearModel = require('../../models/esr/year.model');
const optionModel = require('../../models/esr/option.model');

exports.getAbout = async (req, res, next) => {
    try {
        const result = await aboutModel.findOne();

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

exports.getAllMonths = async (req, res, next) => {
    try {
        const result = await monthModel.find().sort({ monthCode: -1 });

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

exports.getAllFiscalYear = async (req, res, next) => {
    try {
        const result = await fiscalYearModel.find({}, '-_id')
            .sort({ yearCode: -1 });

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


exports.getOption = async (req, res, next) => {
    try {
        const optName = req.params.optName;
        const result = await optionModel.findOne({optionName: optName}, '-_id');

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

