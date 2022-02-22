const promotionModel = require('../../models/mktg/promotion.model');


exports.getAllPromotions = async (req, res, next) => {
    try {
        const result = await promotionModel.find({isFirstPopup: 0})
            .sort({ createdAt: 'desc' });

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

exports.getOnePromotion = async (req, res, next) => {
    try {
        const result = await promotionModel.find({ isFirstPopup: 1 }).sort({ createdAt: 'desc' });

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
