
'use strict';

var express = require('express');
var router = express.Router();


var typesController = require('./typeController')

router.get('/', typesController.list)
router.post('/add', typesController.add)
router.post('/del', typesController.del)
router.post('/upd', typesController.upd)




module.exports = router
