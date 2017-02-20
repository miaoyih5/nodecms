/**
 * Created by LISHI on 2017/1/31.
 */

"use strict";

const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport')


exports.signup = (req, res) => {

    let user = req.body;
    let _user = new User();
    _user.name = req.body.name;
    _user.md5Password(req.body.password)




    _user.save().then((doc) => {
        res.status(200).json({message:'注册成功'})
    }).catch((err) => {
        res.status(404).json(err)
    })


}

exports.login = (req, res) => {



      
    if (!req.body.name || !req.body.password) {
        sendJSONresponse(res, 400, { message: '请输入邮箱和密码!' });
        return;
    }



    passport.authenticate('local', function(err, user, info) {
        var token;
        if (err) {
            res.status(404).json(err)
            return;
        }
        if (user) {
            token = user.generateJwt();
            res.status(200).json({message:'登录成功',token:token})
        } else {
            res.status(401).json({message:info})
        }

    })(req,res);


  


}
exports.loginout = (req, res) => {
    let user = req.body.user;
    res.status('200').json("loginout ok")


}
