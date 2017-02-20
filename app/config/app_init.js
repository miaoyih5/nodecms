/**
 * Created by LISHI on 2017/1/30.
 */

const favicon = require('serve-favicon');

// 日志
const logger = require('morgan');

// cookie
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// 开启gzip
const compression = require('compression');

// 允许跨域
const cors = require('cors');
// restful话接口
const methodOverride = require('method-override');


// session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const config = require('./config')


module.exports = function (app) {
    app.enable('trust proxy');
    var options = {
        origin: true,
        credentials: true
    };

    app.use(cors(options));
    app.use(logger('dev'));
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    // app.use(session({
    //     secret: config.session.secret,
    //     cookie:{
    //         maxAge:config.cookie.maxAge
    //     },
    //     store:new MongoStore({
    //         url: config.session.storeUri,
    //         autoRemove: 'native'
    //     })
    // }));


}
