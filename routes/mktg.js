const express = require('express');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const multer = require('../middleware/multer');

const playerCtrl = require('../controllers/mktg/player.controller');
const questionCtrl = require('../controllers/mktg/question.controller');
const thkCtrl = require('../controllers/mktg/thk.controller');
const srnCtrl = require('../controllers/mktg/srn.controller');
const sroCtrl = require('../controllers/mktg/sro.controller');
const promotionCtrl = require('../controllers/mktg/promotion.controller');


router.get('/players', [passportJWT.isLogin], playerCtrl.getAllPlayers);
router.post('/player', [passportJWT.isLogin], multer.single, playerCtrl.create);
router.put('/player/:id', [passportJWT.isLogin], multer.single, playerCtrl.update);
router.delete('/player/:id', [passportJWT.isLogin], playerCtrl.delete);

router.get('/orgs', [passportJWT.isLogin], playerCtrl.getAllOrgs);
router.get('/levels', [passportJWT.isLogin], playerCtrl.getAllLevels);

router.get('/thkq', [passportJWT.isLogin], questionCtrl.getAllThkQuestions);
router.get('/srnq', [passportJWT.isLogin], questionCtrl.getAllSrnQuestions);
router.get('/sroq', [passportJWT.isLogin], questionCtrl.getAllSroQuestions);

router.get('/ans/thk', [passportJWT.isLogin], thkCtrl.getAllAnswers);
router.get('/surv/thk/:fDate/:tDate', [passportJWT.isLogin], thkCtrl.getAllTracking);
router.post('/surv/thk', [passportJWT.isLogin], thkCtrl.create);
router.put('/surv/thk/:id', [passportJWT.isLogin], thkCtrl.update);
router.delete('/surv/thk/:id', [passportJWT.isLogin], thkCtrl.delete);

router.get('/ans/srn', [passportJWT.isLogin], srnCtrl.getAllAnswers);
router.get('/surv/srn/:fDate/:tDate', [passportJWT.isLogin], srnCtrl.getAllTracking);
router.post('/surv/srn', [passportJWT.isLogin], srnCtrl.create);
router.put('/surv/srn/:id', [passportJWT.isLogin], srnCtrl.update);
router.delete('/surv/srn/:id', [passportJWT.isLogin], srnCtrl.delete);

router.get('/ans/sro', [passportJWT.isLogin], sroCtrl.getAllAnswers);
router.get('/surv/sro/:fDate/:tDate', [passportJWT.isLogin], sroCtrl.getAllTracking);
router.post('/surv/sro', [passportJWT.isLogin], sroCtrl.create);
router.put('/surv/sro/:id', [passportJWT.isLogin], sroCtrl.update);
router.delete('/surv/sro/:id', [passportJWT.isLogin], sroCtrl.delete);
router.get('/promotion', promotionCtrl.getAllPromotions);
router.get('/pro-popup', promotionCtrl.getOnePromotion);



module.exports = router;
