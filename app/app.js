const express = require('express');


// pormise化mongoose
const Promise = require("bluebird");
const mongoose = require("mongoose")
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);


// 错误处理
const errorhandler = require('errorhandler')
const notifier = require('node-notifier')


// express实例化
const app = express();


// 数据库模块加载
require('./config/database')();

// passport验证
const passport = require('passport')
require('./middleware/passport')
app.use(passport.initialize());


// express基础配置
require('./config/app_init')(app);


// 路由加载
require('./routes/')(app);



// catch 404 and forward to error handler
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler({log: errorNotification}))
}

function errorNotification(err, str, req) {
  let title = 'Error in ' + req.method + ' ' + req.url
  notifier.notify({
    title: title,
    message: str
  })
}

module.exports = app;
