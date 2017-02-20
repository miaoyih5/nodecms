/**
 * Created by LISHI on 2017/1/30.
 */
/**
 * Created by LISHI on 2017/1/30.
 */

const express = require('express');
const route = express.Router();
const userControllers = require('./userController')

route.post('/signup',userControllers.signup)
route.post('/login',userControllers.login)
route.post('/loginout',userControllers.loginout)

module.exports = route
