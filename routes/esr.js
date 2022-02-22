const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const multer = require('../middleware/multer');

const esrCtrl = require('../controllers/esr/user.controller');
const utilsCtrl = require('../controllers/esr/utils.controller');
const otpCtrl = require('../controllers/esr/otp.controller');
const mailCtrl = require('../controllers/esr/mail.controller');
//const messagebirdCtrl = require('../controllers/esr/messagebird.controller');


router.get('/emps', esrCtrl.getAllEmps);
router.get('/account', [passportJWT.isLogin], esrCtrl.getProfile);
router.put('/put-contact', [passportJWT.isLogin], multer.single, esrCtrl.updateContact);
router.put('/put-photo', [passportJWT.isLogin], multer.single, esrCtrl.updatePhoto);
router.post('/register', esrCtrl.register);
router.post('/username', esrCtrl.verifyUsername);
router.post('/login', esrCtrl.login);
router.post('/checkpoint', [passportJWT.isLogin], esrCtrl.checkpoint);
router.put('/put-password', esrCtrl.updatePassword);

router.get('/apps', [passportJWT.isLogin], esrCtrl.getApps);
router.post('/assign', [passportJWT.isLogin], esrCtrl.createUserApp);

router.get('/about', utilsCtrl.getAbout);
router.get('/months', utilsCtrl.getAllMonths);
router.get('/month', utilsCtrl.getAllMonths);
router.get('/year', utilsCtrl.getAllFiscalYear);
router.get('/option/:optName', utilsCtrl.getOption);

router.get('/otp-gen', otpCtrl.otpGenerator);
router.post('/otp-mail', mailCtrl.mailler);
router.get('/pwd-gen', otpCtrl.passwordGenerator);

module.exports = router;
