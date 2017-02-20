'use strict';


const express = require('express')
const route = express.Router()

const config = require('../config/config')

// 商品模块
const goodsRoute = require('../backControllers/goods')

// 案例模块
const caseRoute = require('../backControllers/cases')


// 文章管理
const articleRoute = require('../backControllers/articles') 



route.use('/goods', goodsRoute)
route.use('/case', caseRoute)
route.use('/article', articleRoute)

module.exports = route
