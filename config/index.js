require('dotenv').config();

module.exports = {
    DOMAIN: process.env.DOMAIN,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    AUTH_USER: process.env.AUTH_USER,
    AUTH_PASS: process.env.AUTH_PASS,
    PDF_ADMIN: process.env.PDF_ADMIN,
    MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
    MESSAGEBIRD_API_KEY: process.env.MESSAGEBIRD_API_KEY,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN

}