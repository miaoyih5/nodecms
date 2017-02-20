
'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const caseController = require('./caseController')
const caseTagController = require('./caseTagController.js')
const upload = require('../../utils/uploadFile')


// 案例接口
router.post('/', caseController.list)
router.post('/add', caseController.add)
router.post('/del', caseController.del)
router.post('/upd', caseController.upd)
router.post('/getById', caseController.getById)


// 案列分类
router.post('/tag', caseTagController.list)
router.post('/tag/add', caseTagController.add)
router.post('/tag/del', caseTagController.del)
router.post('/tag/upd', caseTagController.upd)
router.post('/tag/getById', caseTagController.getById)



// 文件上传
router.post('/uploadOne',upload.single('cover'),caseController.uploadOne)
router.post('/upload',upload.single('file'),caseController.uploadOne)
router.post('/uploadMultiple',upload.single('imgs'),caseController.uploadMultiple)
router.post('/removeImage',caseController.removeImage)




module.exports = router
