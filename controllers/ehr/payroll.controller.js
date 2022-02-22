const config = require('../../config/index');
const payslipModel = require('../../models/ehr/payslip.model');

const nodemailer = require('nodemailer');
const path = require('path');
const cryptoRandomString = require('crypto-random-string');
const { async } = require('crypto-random-string');
const staticPath = path.join(__dirname, '../../public/ehr/temp/');

exports.getPayslip = async (req, res, next) => {
    try {
        const empId = req.user.empId;
        const month = req.body.month;
        const year = req.body.year;

        const conditions = { empId: empId, monthCode: month, yearCode: year };
        const result = await payslipModel.findOne(conditions, '-_id');

        if (!result) {
            const error = new Error('No data found.');
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

exports.sendPayslipToEmail = async (req, res, next) => {
    try {
        const { month, year, attached } = req.body;
        const toMail = req.user.email;
        const reciveName = req.user.fname + ' ' + req.user.lname;
        const currTime = Date.now();

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.AUTH_USER,
                pass: config.AUTH_PASS
            },
            secure: false
        });

        const msg = `<p>Dear ${reciveName}, <br><br>
        Please find attached payslip for (${month}/${year}), The password to open file is same as your account<br><br>
        Remark:<br>
        This is an automatically generated email – please do not reply to it<br>
        Should you have any questions, please contact Payroll directly<br>
        Thank you.
        </p>`;

        const mailOptions = {
            from: 'E-SR<savanres@gmail.com>',
            to: toMail,
            subject: `Payroll Slip for (${month}/${year})`,
            html: msg,
            attachments: [
                {
                    filename: req.user.empId + '_' + currTime,
                    path: staticPath + attached,
                    contentType: 'application/pdf'
                }
            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                //https://accounts.google.com/b/0/DisplayUnlockCaptcha
                return res.status(500).json({
                    status: 'danger',
                    message: 'Could not send the email'
                });
            } else {
                //this.deleteFile(oldFile);
                //this.deleteFile(newFile);

                return res.status(200).json({
                    status: 'success',
                    message: 'Sent, please check your email'
                });
            }
        });

        transporter.close();
    } catch (error) {
        next(error);
    }
}

exports.deleteFile = async (fileName) => {
    try {
        const fs = require('fs');
        const filePath = staticPath + fileName;

        await fs.unlinkSync(filePath);
    } catch (error) {
        //console.log(error);
    }
}

exports.pdfEncryption = async (inputFile, password, req, res, next) => {
    try {
        const HummusRecipe = require('hummus-recipe');
        const inputPath = staticPath + inputFile;
        const randomString = await cryptoRandomString({ length: 15 });
        const outputFile = randomString + '.pdf';
        const outputPath = staticPath + outputFile;
        const pdfDoc = new HummusRecipe(inputPath, outputPath);

        await pdfDoc.encrypt({
            userPassword: password,
            ownerPassword: config.PDF_ADMIN,
            userProtectionFlag: 4
        }).endPDF();

        //await this.deleteFile(inputFile);

        return outputFile;
    } catch (error) {
        next(error);
    }
}

exports.createPayslip = async (req, res, next) => {
    try {
        const empId = req.user.empId;
        const { month, year, password } = req.body;
        const result = await payslipModel.findOne({ empId: empId, monthCode: month, yearCode: year }, '-_id');

        if (result) {
            const ejs = require("ejs");
            const pdf = require("html-pdf");
            const dirTemplate = path.join(__dirname, '../../public/ehr/templates/', 'payslip.ejs');
            const randomString = await cryptoRandomString({ length: 15 });
            const fileName = randomString + '.pdf';
            const outputPath = staticPath + fileName;
            
            await ejs.renderFile(dirTemplate, { payroll: result }, async (err, data) => {
                if (err) {
                    const error = new Error('Data template error!' + err);
                    error.statusCode = 500;
                    throw error;
                } else {
                    const options = {
                        //"phantomPath":"./node_modules/phantomjs-prebuilt/bin/phantomjs", //for live server
                        "format": 'A4',
                        "orientation": 'landscape',
                        "height": "6.5in",
                        "width": "10.5in",
                        "header": {
                            "height": "7mm"
                        },
                        "footer": {
                            "height": "5mm",
                        },
                    };
                    await pdf.create(data, options).toFile(outputPath, async (err, data) => {
                        if (err) {
                            return next(err);
                        } else {
                            await this.pdfEncryption(fileName, password, req, res, next).then((result) => {
                                if (result) {
                                    return res.status(200).json({
                                        status: 'success',
                                        data: result
                                    });
                                } else {
                                    const error = new Error("Encryption failed");
                                    error.statusCode = 500;
                                    throw error;
                                }
                            });
                        }
                    });
                }
            });
        } else {
            const error = new Error("No data available now, might be the payroll process not finished yet");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }


}

