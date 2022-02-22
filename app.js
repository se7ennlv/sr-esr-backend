const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/index');

const passport = require('passport');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require('cors');

const indexRouter = require('./routes/index');
const esrRouter = require('./routes/esr');
const ehrRouter = require('./routes/ehr');
const mktgRouter = require('./routes/mktg');
const tempRouter = require('./routes/temp');

const errorHandler = require('./middleware/errorHandler');

const app = express();

mongoose.connect(config.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(
    //() => console.log("Successfully connect to MongoDB.")
).catch(
    //err => console.error("Connection error", err)
);

app.use(cors())
app.set('trust proxy', 1);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
//app.use(limiter);
app.use(helmet());

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api/v1/esr', esrRouter);
app.use('/api/v1/ehr', ehrRouter);
app.use('/api/v1/mktg', mktgRouter);
app.use('/api/v1/admin', tempRouter);

app.use(errorHandler);


module.exports = app;
