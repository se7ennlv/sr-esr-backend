const mySurveyModel = require('../../models/ehr/mysurvey.model');
const articleModel = require('../../models/ehr/article.model');
const surveyModel = require('../../models/ehr/survey.model');
const itemDocModel = require('../../models/ehr/doc.item.model');
const subDocModel = require('../../models/ehr/doc.sub.model');
const mainDocModel = require('../../models/ehr/doc.main.model');

const fs = require('fs');
const { isValidObjectId } = require('mongoose');


exports.getAllMainDocs = async (req, res, next) => {
    try {
        await mainDocModel.find().then((result) => {
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

exports.createMainDoc = async (req, res, next) => {
    try {
        const { title, isActive } = req.body;
        const maxIndex = await mainDocModel.findOne({}, 'orderIndex -_id').sort({ "orderIndex": -1 });
        const nextIndex = (maxIndex.orderIndex + 1);

        let model = new mainDocModel({
            title: title,
            orderIndex: nextIndex,
            isActive: isActive
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
            };
        });
    } catch (error) {
        next(error);
    }
}

exports.updateMainDoc = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            const { title, isActive } = req.body;

            const result = await mainDocModel.updateOne({ _id: id }, {
                title: title,
                isActive: isActive
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

exports.deleteMainDoc = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            await mainDocModel.deleteOne({ "_id": id }, (err) => {
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


exports.getAllSubDocs = async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const cond = groupId != 'any' ? { mainGroupId: groupId } : null;

        await subDocModel.find(cond, '-orderIndex')
            .populate('main', 'title')
            .sort({ title: 'desc' })
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

exports.createSubDoc = async (req, res, next) => {
    try {
        const { mainGroupId, title, isActive } = req.body;
        const maxIndex = await subDocModel.findOne({ mainGroupId: mainGroupId }, 'orderIndex -_id').sort({ "orderIndex": -1 });
        let nextIndex = 0;

        if (maxIndex) {
            nextIndex = (maxIndex.orderIndex + 1);
        }

        let model = new subDocModel({
            mainGroupId: mainGroupId,
            title: title,
            orderIndex: nextIndex,
            isActive: isActive
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
            };
        });
    } catch (error) {
        next(error);
    }
}

exports.updateSubDoc = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            const { mainGroupId, title, isActive } = req.body;

            const result = await subDocModel.updateOne({ _id: id }, {
                mainGroupId: mainGroupId,
                title: title,
                isActive: isActive
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

exports.deleteSubDoc = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            await subDocModel.deleteOne({ "_id": id }, (err) => {
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


exports.getAllItemDocs = async (req, res, next) => {
    try {
        await itemDocModel.find()
            .populate('main', 'title')
            .populate('sub', 'title')
            .sort({ title: 'desc' })
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

exports.createItemDoc = async (req, res, next) => {
    try {
        const { mainGroupId, subGroupId, title, subtitle, isActive } = req.body;
        let fileSrc = null;

        if (req.file) {
            const fileName = req.file.filename;
            fileSrc = 'uploads/ehr/docs/' + fileName;
        }

        let model = new itemDocModel({
            mainGroupId: mainGroupId,
            subGroupId: subGroupId,
            title: title,
            subtitle: subtitle,
            fileSrc: fileSrc,
            isActive: isActive
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

exports.updateItemDoc = async (req, res, next) => {
    try {
        const id = req.params.id;
        let fileSrc;

        if (isValidObjectId(id)) {
            const { mainGroupId, subGroupId, title, subtitle, isActive } = req.body;
            const oldFile = await itemDocModel.findOne({ _id: id }, 'fileSrc -_id');

            if (req.file) {
                const fileName = req.file.filename;
                fileSrc = 'uploads/ehr/docs/' + fileName;
            } else {
                fileSrc = oldFile.fileSrc;
            }

            const result = await itemDocModel.updateOne({ _id: id }, {
                mainGroupId: mainGroupId,
                subGroupId: subGroupId,
                title: title,
                subtitle: subtitle,
                fileSrc: fileSrc,
                isActive: isActive
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

exports.deleteItemDoc = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            const oldFile = await itemDocModel.findOne({ _id: id }, 'fileSrc -_id');

            await itemDocModel.deleteOne({ "_id": id }, (err) => {
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


exports.getAllArticles = async (req, res, next) => {
    try {
        await articleModel.find()
            .sort({ createdAt: 'desc' })
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


exports.createArticle = async (req, res, next) => {
    try {
        const { topic, desc, publishedAt } = req.body;
        let fileSrc = null;

        if (req.file) {
            const fileName = req.file.filename;
            fileSrc = 'uploads/ehr/images/articles/' + fileName;
        }

        let model = new articleModel({
            topic: topic,
            desc: desc,
            fileSrc: fileSrc,
            publishedAt: publishedAt
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

exports.updateArticle = async (req, res, next) => {
    try {
        const id = req.params.id;
        let fileSrc;

        if (isValidObjectId(id)) {
            const { topic, desc, publishedAt } = req.body;
            const oldFile = await articleModel.findOne({ _id: id }, 'fileSrc -_id');

            if (req.file) {
                const fileName = req.file.filename;
                fileSrc = 'uploads/ehr/images/articles/' + fileName;
            } else {
                fileSrc = oldFile.fileSrc;
            }

            const result = await articleModel.updateOne({ _id: id }, {
                topic: topic,
                desc: desc,
                fileSrc: fileSrc,
                publishedAt: publishedAt
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

exports.deleteArticle = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            const oldFile = await articleModel.findOne({ _id: id }, 'fileSrc -_id');

            await articleModel.deleteOne({ "_id": id }, (err) => {
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


exports.getAllSurveys = async (req, res, next) => {
    try {
        await surveyModel.find()
            .sort({ createdAt: 'desc' })
            .then((result) => {
                if (!result) {
                    const error = new Error('Error Occurred');
                    error.statusCode = 500;
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

exports.createSurvey = async (req, res, next) => {
    try {
        const { topic, url, status } = req.body;

        let model = new surveyModel({
            topic: topic,
            url: url,
            status: status
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

exports.assignSurvey = async (req, res, next) => {
    const currYear = new Date().getFullYear();
    const dataArray = req.body;

    const result = dataArray.map(data => ({
        empId: data.empId,
        empName: data.fullName,
        dept: data.deptName,
        surveyId: data.survId,
        onYear: currYear
    }));

    await mySurveyModel.insertMany(result).then(() => {
        return res.status(201).json({
            status: 'success',
            message: 'Created'
        });
    }).catch((error) => {
        error = new Error('Error Occurred');
        error.statusCode = 500;

        next(error);
    });
}

exports.updateSurvey = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            const { topic, url, status } = req.body;

            const result = await surveyModel.updateOne({ _id: id }, {
                topic: topic,
                url: url,
                status: status
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

exports.deleteSurvey = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (isValidObjectId(id)) {
            await surveyModel.deleteOne({ "_id": id }, (err) => {
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

exports.getAllSurveyReport = async (req, res, next) => {
    try {
        const year = req.params.y;

        const selectFields = 'topic url';
        await mySurveyModel.find({ onYear: year })
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
