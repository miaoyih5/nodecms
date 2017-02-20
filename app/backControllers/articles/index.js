

'use strict';

const express = require('express');
const router = express.Router();


const articleController = require('./articleController')
const articleTagController = require('./articleTagController')


 
router.post('/', articleController.list)
router.put('/add', articleController.add)
router.delete('/del/:id', articleController.del)
router.post('/upd', articleController.upd)


router.post('/tag', articleTagController.list)
router.put('/tag/add', articleTagController.add)
router.delete('/tag/del/:id', articleTagController.del)
router.post('/tag/upd', articleTagController.upd)



module.exports = router
