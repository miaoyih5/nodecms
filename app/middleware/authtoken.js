'use strict';

const config = require('../config/config')
const jwt = require('jwt-simple')

// 登录验证



module.exports = (req, res, next) => {

    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (token) {
        try {
            let decoded = jwt.decode(token, config.jwt);

            req.user = decoded.iss;


            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            } else {
                next();
            }
        } catch (err) {
            return res.end('Access token error', 400);
        }
    } else {
        res.end('nologin', 400);
    }




}
