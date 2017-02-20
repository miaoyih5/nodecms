

'use strict';

var express = require('express');
var router = express.Router();


var brandController = require('./brandController')


 
router.post('/', brandController.list)
router.put('/add', brandController.add)
router.delete('/del', brandController.del)
router.post('/upd', brandController.upd)




module.exports = router
