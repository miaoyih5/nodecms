const express = require('express');
const router = express.Router();

const goodRoute = require('./good')
const brandRoute = require('./brand')
const typeRoute = require('./types')
const cateRoute = require('./cates')

router.use('/',goodRoute)
router.use('/brand',brandRoute)
router.use('/type',typeRoute)
router.use('/cate',cateRoute)


module.exports = router
