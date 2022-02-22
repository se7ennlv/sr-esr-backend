const config = require('../../config/index');
const nodemailer = require('nodemailer');

exports.mailler = async (req, res, next) => {
    try {
        const { to, subject, body } = req.body;

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.AUTH_USER,
                pass: config.AUTH_PASS
            },
            secure: false
        });

        const mailOptions = {
            from: 'E-SR<savanres@gmail.com>',
            to: to,
            subject: `${subject}`,
            html: `${body}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                error.statusCode = 500;
                throw error;
            } else {
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

