
'use strict';

var express = require('express');
var router = express.Router();
var cateController = require('./cateController')

router.get('/', cateController.list)
router.post('/add', cateController.add)
router.post('/del', cateController.del)
router.post('/upd', cateController.upd)





module.exports = router
