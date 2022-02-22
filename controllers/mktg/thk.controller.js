const thkModel = require('../../models/mktg/thk.model');
const answerModel = require('../../models/mktg/answers.model');
const { isValidObjectId } = require('mongoose');



exports.getAllAnswers = async (req, res, next) => {
    try {
        await answerModel.find({ orgCode: 'THK', questionNumber: ['q41', 'q43'] })
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

        console.log(startDate);
        console.log(endDate);

        await thkModel.find({ surveyAt: { $gte: startDate, $lt: endDate } })
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
        let model = new thkModel({
            umid: req.body.umid,
            fullName: req.body.fullName,
            q11: req.body.q11,
            q211: req.body.q211,
            q212: req.body.q212,
            q213: req.body.q213,
            q214: req.body.q214,
            q221: req.body.q221,
            q222: req.body.q222,
            q223: req.body.q223,
            q224: req.body.q224,
            q225: req.body.q225,
            q311: req.body.q311,
            q312: req.body.q312,
            q313: req.body.q313,
            q321: req.body.q321,
            q322: req.body.q322,
            q41: req.body.q41,
            q42: req.body.q42,
            q43: req.body.q43,
            q44: req.body.q44,
            q45: req.body.q45,
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
            const result = await thkModel.updateOne({ _id: id }, {
                q11: req.body.q11,
                q211: req.body.q211,
                q212: req.body.q212,
                q213: req.body.q213,
                q214: req.body.q214,
                q221: req.body.q221,
                q222: req.body.q222,
                q223: req.body.q223,
                q224: req.body.q224,
                q225: req.body.q225,
                q311: req.body.q311,
                q312: req.body.q312,
                q313: req.body.q313,
                q321: req.body.q321,
                q322: req.body.q322,
                q41: req.body.q41,
                q42: req.body.q42,
                q43: req.body.q43,
                q44: req.body.q44,
                q45: req.body.q45,
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
            await thkModel.deleteOne({ "_id": id }, (err) => {
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
