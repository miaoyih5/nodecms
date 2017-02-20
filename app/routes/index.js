/**
 * Created by LISHI on 2017/1/30.
 */



module.exports = function(app) {

    // 后台api入口
    app.use('/api', require('./api'));

    // 前台api入口
    app.use('/apiv2', require('./api2'));
}
