const playerModel = require('../../models/mktg/player.model');
const orgModel = require('../../models/mktg/org.model');
const levelModel = require('../../models/mktg/level.model');
const fs = require('fs');
const { isValidObjectId } = require('mongoose');

exports.getAllPlayers = async (req, res, next) => {
    try {
        const excludeFields = '-_id -createdAt -updatedAt';

        await playerModel.find()
            .populate('org', excludeFields)
            .populate('level', excludeFields)
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

exports.getAllOrgs = async (req, res, next) => {
    try {
        await orgModel.find({}, '-createdAt -updatedAt')
            .sort({ code: 'asc' })
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

exports.getAllLevels = async (req, res, next) => {
    try {
        await levelModel.find()
            .sort({ name: 1 })
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
        const fullName = req.body.firstName + ' ' + req.body.lastName;
        let fileSrc = null;

        if (req.file) {
            const fileName = req.file.filename;
            fileSrc = 'uploads/mktg/images/players/' + fileName;
        }

        let model = new playerModel({
            umid: req.body.umid,
            fileSrc: fileSrc,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            fullName: fullName,
            orgId: req.body.orgId,
            levelId: req.body.levelId,
            rolling: req.body.rolling,
            winLoss: req.body.winLoss,
            gender: req.body.gender,
            tel: req.body.tel,
            address: req.body.address,
            relationship: req.body.relationship,
            isActive: req.body.isActive
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
        let fileSrc;

        if (isValidObjectId(id)) {
            const oldFile = await playerModel.findOne({ _id: id }, 'fileSrc -_id');
            const fullName = req.body.firstName + ' ' + req.body.lastName;

            if (req.file) {
                const fileName = req.file.filename;
                fileSrc = 'uploads/mktg/images/players/' + fileName;
            } else {
                fileSrc = oldFile.fileSrc;
            }

            const result = await playerModel.updateOne({ _id: id }, {
                umid: req.body.umid,
                fileSrc: fileSrc,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                fullName: fullName,
                orgId: req.body.orgId,
                levelId: req.body.levelId,
                rolling: req.body.rolling,
                winLoss: req.body.winLoss,
                gender: req.body.gender,
                tel: req.body.tel,
                address: req.body.address,
                relationship: req.body.relationship,
                isActive: req.body.isActive
            });

            if (result.nModified === 0) {
                const error = new Error('Error Occurred');
                error.statusCode = 500;
                throw error;
            } else {
                if (req.file && oldFile.fileSrc) {
                    fs.unlink('public/' + oldFile.fileSrc, (err) => { });
                }

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
            const oldFile = await playerModel.findOne({ _id: id }, 'fileSrc -_id');

            await playerModel.deleteOne({ "_id": id }, (err) => {
                if (err) {
                    const error = new Error('Error Occurred');
                    error.statusCode = 500;
                    throw error;
                } else {
                    if (oldFile.fileSrc) {
                        fs.unlink('public/' + oldFile.fileSrc, (err) => { });
                    }

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

