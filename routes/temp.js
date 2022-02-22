const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/temp/temp.controller');


router.get('/del', adminCtrl.delAllDocs);
router.get('/find', adminCtrl.findAllDocs);


module.exports = router;
