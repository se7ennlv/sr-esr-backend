const config = require('../../config/index');
const messagebird = require('messagebird')(config.MESSAGEBIRD_API_KEY);

exports.createOtp = (req, res, next) => {
    var phoneNumber = req.body.number;

    messagebird.verify.create(phoneNumber, {
        originator: 'E-SR',
        template: 'Your E-SR verification code is %token.'
    }, function (err, response) {
        if (err) {
            const errors = err.errors[0].description;

            console.log('Request has failed ' + errors);
            return console.log(errors);
        } else {
            return res.status(200).json({
                status: 'success',
                data: response.recipient
            });
        }
    });

}

exports.verifyOtp = (req, res, next) => {
    var id = req.body.id;
    var token = req.body.token;

    messagebird.verify.verify(id, token, function (err, response) {
        if (err) {
            const errMsg = err.errors[0].description;
            const error = new Error('Error ' + errMsg);

            error.statusCode = 500;
            throw error;
        } else {
            console.log(response);
            return res.status(200).json({
                status: 'success',
                data: response
            });
        }
    });
}

