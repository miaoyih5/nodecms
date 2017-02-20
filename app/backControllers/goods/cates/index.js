
'use strict';

var express = require('express');
var router = express.Router();


var caseController = require('./caseController')

router.get('/', caseController.list)
router.post('/add', caseController.add)
router.post('/del', caseController.del)
router.post('/upd', caseController.upd)




module.exports = router
