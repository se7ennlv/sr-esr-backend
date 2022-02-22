const srnModel = require('../../models/mktg/srn.model');
const answerModel = require('../../models/mktg/answers.model');
const { isValidObjectId } = require('mongoose');


exports.getAllAnswers = async (req, res, next) => {
    try {
        await answerModel.find({ orgCode: 'SR', relationship: 'NEW' })
            .sort({ questionNumber: 'ASC', orderIndex: 'ASC' })
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

exports.getAllTracking = async (req, res, next) => {
    try {
        const startDate = Date.parse(req.params.fDate);
        const endDate = Date.parse(req.params.tDate);

        await srnModel.find({ surveyAt: { $gte: startDate, $lt: endDate } })
            .sort({ surveyAt: -1 })
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

exports.create = async (req, res, next) => {
    try {
        let model = new srnModel({
            umid: req.body.umid,
            fullName: req.body.fullName,
            q111: req.body.q111,
            q112: req.body.q112,
            q113: req.body.q113,
            q121: req.body.q121,
            q122: req.body.q122,
            q123: req.body.q123,
            q131: req.body.q131,
            q132: req.body.q132,
            q133: req.body.q133,
            q141: req.body.q141,
            q211: req.body.q211,
            q212: req.body.q212,
            q213: req.body.q213,
            q221: req.body.q221,
            q222: req.body.q222,
            q223: req.body.q223,
            q31: req.body.q31,
            q321: req.body.q321,
            q322: req.body.q322,
            q323: req.body.q323,
            q324: req.body.q324,
            q323: req.body.q323,
            q41: req.body.q41,
            q42: req.body.q42,
            q43: req.body.q43,
            q44: req.body.q44,
            q51: req.body.q51,
            q52: req.body.q52,
            q53: req.body.q53,
            q54: req.body.q54,
            q55: req.body.q55,
            q56: req.body.q56,
            surveyAt: req.body.surveyAt,
            comment: req.body.comment
        });

        await model.save((err, doc) => {
            if (err) {
                const error = new Error('Error Occurred');
                error.statusCode = 500;
                throw error;
            } else {
                return res.status(201).json({
                    status: 'success',
                    message: 'Created'
                });
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            const result = await srnModel.updateOne({ _id: id }, {
                q111: req.body.q111,
                q112: req.body.q112,
                q113: req.body.q113,
                q121: req.body.q121,
                q122: req.body.q122,
                q123: req.body.q123,
                q131: req.body.q131,
                q132: req.body.q132,
                q133: req.body.q133,
                q141: req.body.q141,
                q211: req.body.q211,
                q212: req.body.q212,
                q213: req.body.q213,
                q221: req.body.q221,
                q222: req.body.q222,
                q223: req.body.q223,
                q31: req.body.q31,
                q321: req.body.q321,
                q322: req.body.q322,
                q323: req.body.q323,
                q324: req.body.q324,
                q323: req.body.q323,
                q41: req.body.q41,
                q42: req.body.q42,
                q43: req.body.q43,
                q44: req.body.q44,
                q51: req.body.q51,
                q52: req.body.q52,
                q53: req.body.q53,
                q54: req.body.q54,
                q55: req.body.q55,
                q56: req.body.q56,
                surveyAt: req.body.surveyAt,
                comment: req.body.comment
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

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            await srnModel.deleteOne({ "_id": id }, (err) => {
                if (err) {
                    const error = new Error('Error Occurred');
                    error.statusCode = 500;
                    throw error;
                } else {
                    return res.status(200).json({
                        status: 'success',
                        message: 'Deleted'
                    });
                }
            });
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
