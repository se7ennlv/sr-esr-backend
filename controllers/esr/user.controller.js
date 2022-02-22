const userModel = require('../../models/esr/user.model');
const appModel = require('../../models/esr/user.app.model');
const srpModel = require('../../models/ehr/srp.model');
const mymartModel = require('../../models/ehr/mymart.model');


const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const fs = require('fs');
const { validationResult } = require('express-validator');


exports.getAllEmps = async (req, res, next) => {
    try {
        const selectFields = '_id fileSrc empId fullName deptName jobTitle';
        const result = await userModel.find({ isActive: 1 }, selectFields)
            .sort({ empId: 1 });

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

exports.register = async (req, res, next) => {
    try {
        const username = req.body.username;
        const isExistUser = await userModel.findOne({ username: username });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Invalid entered information');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        if (isExistUser) {
            const error = new Error('User is already exist');
            error.statusCode = 400;
            throw error;
        }

        let user = new userModel();
        user.username = username,
            user.password = await user.encryptPassword(req.body.password),
            user.fileSrc = req.body.fileSrc,
            user.empId = req.body.empId,
            user.fname = req.body.fname,
            user.lname = req.body.lname,
            user.fullName = req.body.fullName,
            user.gender = req.body.gender,
            user.deptId = req.body.deptId,
            user.deptName = req.body.deptName,
            user.jobTitle = req.body.jobTitle,
            user.tel = req.body.tel,
            user.hiringDate = req.body.hiringDate,
            user.email = req.body.email,
            user.role = {
                id: req.body.role.id,
                name: req.body.role.name
            }

        await user.save();

        return res.status(201).json({
            status: 'success',
            message: 'Created'
        });
    } catch (error) {
        next(error);
    }
}

exports.verifyUsername = async (req, res, next) => {
    try {
        const whereField = req.body;
        const user = await userModel.findOne(whereField);

        if (!user) {
            const error = new Error('This username is find not found.');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            status: 'success',
            message: 'Valid username',
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username: username });

        if (!user) {
            const error = new Error('ID');
            error.statusCode = 401;
            throw error;
        }

        const isValidPwd = await user.checkPassword(password);

        if (!isValidPwd) {
            const error = new Error('PWD');
            error.statusCode = 401;
            throw error;
        }

        const token = await jwt.sign({
            id: user.id,
            role: user.roleId
        }, config.JWT_SECRET, { expiresIn: '1d' });

        const expiresIn = jwt.decode(token);

        return res.status(200).json({
            access_token: token,
            expires_in: expiresIn.exp,
            token_type: 'Bearer'
        });
    } catch (error) {
        next(error);
    }
};

exports.checkpoint = async (req, res, next) => {
    try {
        const username = req.user.username;
        const password = req.body.password;
        const user = await userModel.findOne({ username: username });
        const isValid = await user.checkPassword(password);

        if (!isValid) {
            const error = new Error('Incorrect password, please try again');
            error.statusCode = 401;
            throw error;
        }

        return res.status(200).json({
            status: 'success',
            message: 'Success'
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { username, newPassword } = req.body;
        const conditions = { username: username };

        const user = await userModel.findOne(conditions, 'checksum -_id');
        const hashPassword = await user.encryptPassword(newPassword);

        await userModel.findOneAndUpdate(conditions, {
            $set: {
                password: hashPassword,
                passwordUpdatedAt: Date.now()
            }
        }, { upsert: true }, (err, doc) => {
            if (err) {
                const error = new Error(err.message);
                error.statusCode = 500;
                throw error;
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'Updated'
                });
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getSrpSummary = async (empId) => {
    try {
        const sum = await srpModel.aggregate([
            { "$match": { 'empId': empId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$reqScore" }
                }
            }
        ]);

        let totalScore = 0;

        if (sum.length > 0) {
            totalScore = parseFloat(sum[0].total.toString());
        }

        return totalScore;
    } catch (error) {

    }
}

exports.getMyMartSummary = async (empId) => {
    try {
        const sum = await mymartModel.aggregate([
            { "$match": { "empId": empId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalCredit" }
                }
            }
        ]);

        let totalCredit = 0;

        if (sum.length > 0) {
            totalCredit = parseFloat(sum[0].total.toString());
        }

        const balance = (1000 - totalCredit);

        return balance;
    } catch (error) {
        //console.log('mymart ' + error);
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const empId = req.user.empId;
        const sumSrp = await this.getSrpSummary(empId);
        const sumMyMart = await this.getMyMartSummary(empId);

        return res.status(200).json(
            {
                id: req.user._id,
                fileSrc: req.user.fileSrc,
                empId: req.user.empId,
                fname: req.user.fname,
                lname: req.user.lname,
                fullName: req.user.fullName,
                gender: req.user.gender,
                deptId: req.user.deptId,
                deptName: req.user.deptName,
                jobTitle: req.user.jobTitle,
                tel: req.user.tel,
                email: req.user.email,
                hiringDate: req.user.hiringDate,
                srpScore: sumSrp,
                mymartBalance: sumMyMart,
                role: {
                    id: req.user.role.id,
                    name: req.user.role.name
                },
                passwordUpdatedAt: req.user.passwordUpdatedAt
            }
        );
    } catch (error) {
        next(error);
    }

}

exports.updatePhoto = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const oldFile = req.user.fileSrc;

        let fileName;
        let fileSrc;

        if (req.file) {
            fileName = req.file.filename;
            fileSrc = 'uploads/esr/images/emps/' + fileName;

            console.log(fileName);
        }

        const query = { _id: userId };
        await userModel.findOneAndUpdate(query, {
            $set: {
                fileSrc: fileSrc
            }
        }, { upsert: true }, (err, doc) => {
            if (err) {
                const error = new Error('Error occurred in the process');
                error.statusCode = 500;
                throw error;
            } else {
                if (req.file && oldFile) {
                    fs.unlink('./public/' + oldFile, (err) => { });
                }

                return res.status(200).json({
                    status: 'success',
                    message: 'Updated'
                });
            }
        });
    } catch (error) {
        next(error);
    }
}


exports.updateContact = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { email, tel } = req.body;

        const query = { _id: userId };
        await userModel.findOneAndUpdate(query, {
            $set: {
                email: email,
                tel: tel
            }
        }, { upsert: true }, (err, doc) => {
            if (err) {
                const error = new Error('Error occurred in the process');
                error.statusCode = 500;
                throw error;
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'Updated'
                });
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.createUserApp = async (req, res, next) => {
    try {
        const { userId, sys_id } = req.body;

        await models.Assignment.create({
            userId: userId,
            sys_id: sys_id
        }).then((result) => {
            if (!result) {
                const error = new Error('Error occurred in the process');
                error.statusCode = 500;
                throw error;
            }

            return res.status(201).json({
                status: 'success',
                message: 'Created'
            });
        });
    } catch (error) {
        next(error);
    }
}

exports.getApps = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await appModel.findOne({ userId: userId }, '-_id');

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


exports.createLogIn = async (req, res, next, username) => {
    // try {
    //     const user = await models.User.findOne({ where: { username: username } });

    //     await models.Log.create({
    //         empId: user.empId,
    //         emp_name: user.fullName,
    //         dept: user.deptName
    //     }).then((result) => {
    //         if (!result) {
    //             const error = new Error('Error occurred in the process');
    //             error.statusCode = 500;
    //             throw error;
    //         }

    //         return res.status(201).json({
    //             status: 'success',
    //             message: 'Created'
    //         });
    //     });
    // } catch (error) {
    //     next(error);
    // }
}

exports.createLogOut = async (req, res, next) => {
    // try {
    //     console.log('User info ==========> '+ req.params.empId);

    //     // await models.Log.create({
    //     //     empId: user.empId,
    //     //     emp_name: user.fullName,
    //     //     dept: user.deptName
    //     // }).then((result) => {
    //     //     if (!result) {
    //     //         const error = new Error('Error occurred in the process');
    //     //         error.statusCode = 500;
    //     //         throw error;
    //     //     }

    //     //     return res.status(201).json({
    //     //         status: 'success',
    //     //         message: 'Created'
    //     //     });
    //     // });
    // } catch (error) {
    //     next(error);
    // }
}

