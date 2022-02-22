const express = require('express');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const multer = require('../middleware/multer');

const benefitCtrl = require('../controllers/ehr/benefit.controller');
const adminCtrl = require('../controllers/ehr/admin.controller');
const payrollCtrl = require('../controllers/ehr/payroll.controller');
const docCtrl = require('../controllers/ehr/doc.controller');

router.get('/srp', [passportJWT.isLogin], benefitCtrl.getSRP);
router.get('/mymart', [passportJWT.isLogin], benefitCtrl.getMyMart);
router.get('/leave', [passportJWT.isLogin], benefitCtrl.getLeave);
router.get('/roster', [passportJWT.isLogin], benefitCtrl.getRoster);
router.post('/payslip-json', [passportJWT.isLogin], payrollCtrl.getPayslip);
router.get('/mycln/:y', [passportJWT.isLogin], benefitCtrl.getAllMyClinicRecords);
router.get('/mysurvey/:y', [passportJWT.isLogin], benefitCtrl.getAllMySurveys);
router.put('/surv/put', [passportJWT.isLogin], benefitCtrl.updateMySurvey);

router.get('/doc/main', [passportJWT.isLogin], docCtrl.getMainDocs);
router.get('/doc/sub/:id', [passportJWT.isLogin], docCtrl.getAllSubAndItemDocs);

router.get('/admin/doc/main', [passportJWT.isLogin], adminCtrl.getAllMainDocs);
router.post('/admin/doc/main', [passportJWT.isLogin], adminCtrl.createMainDoc);
router.put('/admin/doc/main/:id', [passportJWT.isLogin], adminCtrl.updateMainDoc);
router.delete('/admin/doc/main/:id/', [passportJWT.isLogin], adminCtrl.deleteMainDoc);

router.get('/admin/doc/sub/:groupId', [passportJWT.isLogin], adminCtrl.getAllSubDocs);
router.post('/admin/doc/sub', [passportJWT.isLogin], adminCtrl.createSubDoc);
router.put('/admin/doc/sub/:id', [passportJWT.isLogin], adminCtrl.updateSubDoc);
router.delete('/admin/doc/sub/:id/', [passportJWT.isLogin], adminCtrl.deleteSubDoc);

router.get('/admin/doc/item', [passportJWT.isLogin], adminCtrl.getAllItemDocs);
router.post('/admin/doc/item', [passportJWT.isLogin], multer.single, adminCtrl.createItemDoc);
router.put('/admin/doc/item/:id', [passportJWT.isLogin], multer.single, adminCtrl.updateItemDoc);
router.delete('/admin/doc/item/:id/', [passportJWT.isLogin], adminCtrl.deleteItemDoc);

router.get('/articles', adminCtrl.getAllArticles);
router.post('/article', [passportJWT.isLogin], multer.single, adminCtrl.createArticle);
router.put('/article/:id', [passportJWT.isLogin], multer.single, adminCtrl.updateArticle);
router.delete('/article/:id', adminCtrl.deleteArticle);

router.get('/surveys', [passportJWT.isLogin], adminCtrl.getAllSurveys);
router.get('/surv/rpt/:y', [passportJWT.isLogin], adminCtrl.getAllSurveyReport);
router.post('/survey', [passportJWT.isLogin], adminCtrl.createSurvey);
router.post('/surv/assign', [passportJWT.isLogin], adminCtrl.assignSurvey);
router.put('/survey/:id', [passportJWT.isLogin], adminCtrl.updateSurvey);
router.delete('/survey/:id', [passportJWT.isLogin], adminCtrl.deleteSurvey);

router.post('/payslip', [passportJWT.isLogin], payrollCtrl.createPayslip);
router.post('/sendmail', [passportJWT.isLogin], payrollCtrl.sendPayslipToEmail);



module.exports = router;
