
// 前台网站api入口

const express = require('express')
const route = express.Router()

const config = require('../config/config')




route.use('/goods', function(req,res){
  res.json(2313)
})


module.exports = route
