
'use strict';

var express = require('express');
var router = express.Router();
var goodsController = require('./goodsController')

router.get('/', goodsController.list)
router.post('/add', goodsController.add)
router.post('/del', goodsController.del)
router.post('/upd', goodsController.upd)




module.exports = router
