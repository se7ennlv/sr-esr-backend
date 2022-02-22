const otpGenerator = require('otp-generator');
const userModel = require('../../models/esr/user.model');

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const options = {
    digits: true,
    upperCase: false,
    specialChars: false,
    alphabets: false
};

exports.otpGenerator = async (req, res, next) => {
    try {
        const _otpCode = otpGenerator.generate(4, options);
        const otpCode = 'SR' + _otpCode;

        return res.status(200).json({
            status: 'success',
            data: otpCode
        });
    } catch (error) {
        next(error);
    }
}

exports.passwordGenerator = async (req, res, next) => {
    let user = new userModel();
    let beforEncrypted = [];
    let afterEncrypted = [];

    for (let index = 0; index < 1273; index++) {
        const _otpCode = otpGenerator.generate(5, options);
        const otpCode = 'ESR' + _otpCode;
        const password = await user.encryptPassword(otpCode);

        beforEncrypted.push(otpCode);
        afterEncrypted.push(password);
    }

    return res.status(200).json({
        beforEncrypted: beforEncrypted,
        afterEncrypted: afterEncrypted
    });
}

// exports.twilioOtp = async (req, res, next) => {
//     try {
//         const result = await client.messages.create({
//             from: '+18722137939',
//             to: '+8562098982646',
//             body: "You just sent an SMS from Node.js using Twilio!"
//         });

//         if (result) {
//             return res.status(200).json({
//                 status: 'success',
//                 data: result
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// }