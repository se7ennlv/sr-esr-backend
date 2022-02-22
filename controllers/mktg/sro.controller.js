const sroModel = require('../../models/mktg/sro.model');
const answerModel = require('../../models/mktg/answers.model');
const { isValidObjectId } = require('mongoose');


exports.getAllAnswers = async (req, res, next) => {
    try {
        await answerModel.find({ orgCode: 'SR', relationship: 'OLD' })
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

        await sroModel.find({ surveyAt: { $gte: startDate, $lt: endDate } })
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
        let model = new sroModel({
            umid: req.body.umid,
            fullName: req.body.fullName,
            q111: req.body.q111,
            q112: req.body.q112,
            q113: req.body.q113,
            q121: req.body.q121,
            q122: req.body.q122,
            q123: req.body.q123,
            q13: req.body.q13,
            q141: req.body.q141,
            q142: req.body.q142,
            q151: req.body.q151,
            q152: req.body.q152,
            q153: req.body.q153,
            q161: req.body.q161,
            q162: req.body.q162,
            q163: req.body.q163,
            q171: req.body.q171,
            q211: req.body.q211,
            q212: req.body.q212,
            q213: req.body.q213,
            q221: req.body.q221,
            q222: req.body.q222,
            q223: req.body.q223,
            q231: req.body.q231,
            q232: req.body.q232,
            q233: req.body.q233,
            q241: req.body.q241,
            q242: req.body.q242,
            q243: req.body.q243,
            q251: req.body.q251,
            q252: req.body.q252,
            q253: req.body.q253,
            q261: req.body.q261,
            q262: req.body.q262,
            q263: req.body.q263,
            q271: req.body.q271,
            q272: req.body.q272,
            q273: req.body.q273,
            q281: req.body.q281,
            q282: req.body.q282,
            q283: req.body.q283,
            q284: req.body.q284,
            q285: req.body.q285,
            q286: req.body.q286,
            q287: req.body.q287,
            q288: req.body.q288,
            q29: req.body.q29,
            q31: req.body.q31,
            q32: req.body.q32,
            q33: req.body.q33,
            q34: req.body.q34,
            q351: req.body.q351,
            q352: req.body.q352,
            q353: req.body.q353,
            q354: req.body.q354,
            q41: req.body.q41,
            q42: req.body.q42,
            q43: req.body.q43,
            q44: req.body.q44,
            q45: req.body.q45,
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
            const result = await sroModel.updateOne({ _id: id }, {
                q111: req.body.q111,
                q112: req.body.q112,
                q113: req.body.q113,
                q121: req.body.q121,
                q122: req.body.q122,
                q123: req.body.q123,
                q13: req.body.q13,
                q141: req.body.q141,
                q142: req.body.q142,
                q151: req.body.q151,
                q152: req.body.q152,
                q153: req.body.q153,
                q161: req.body.q161,
                q162: req.body.q162,
                q163: req.body.q163,
                q171: req.body.q171,
                q211: req.body.q211,
                q212: req.body.q212,
                q213: req.body.q213,
                q221: req.body.q221,
                q222: req.body.q222,
                q223: req.body.q223,
                q231: req.body.q231,
                q232: req.body.q232,
                q233: req.body.q233,
                q241: req.body.q241,
                q242: req.body.q242,
                q243: req.body.q243,
                q251: req.body.q251,
                q252: req.body.q252,
                q253: req.body.q253,
                q261: req.body.q261,
                q262: req.body.q262,
                q263: req.body.q263,
                q271: req.body.q271,
                q272: req.body.q272,
                q273: req.body.q273,
                q281: req.body.q281,
                q282: req.body.q282,
                q283: req.body.q283,
                q284: req.body.q284,
                q285: req.body.q285,
                q286: req.body.q286,
                q287: req.body.q287,
                q288: req.body.q288,
                q29: req.body.q29,
                q31: req.body.q31,
                q32: req.body.q32,
                q33: req.body.q33,
                q34: req.body.q34,
                q351: req.body.q351,
                q352: req.body.q352,
                q353: req.body.q353,
                q354: req.body.q354,
                q41: req.body.q41,
                q42: req.body.q42,
                q43: req.body.q43,
                q44: req.body.q44,
                q45: req.body.q45,
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
            await sroModel.deleteOne({ "_id": id }, (err) => {
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
