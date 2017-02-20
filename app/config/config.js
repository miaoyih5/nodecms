/**
 * Created by LISHI on 2017/1/30.
 */


module.exports = {
    app:{
        name:'shop2017',
        port:9263,
        version:1
    },
    mongo:{
        uri: 'mongodb://127.0.0.1/shop2017'
    },
    jwt:"shop2017",
    session:{
        secret:'shop2017',
        storeUri:'mongodb://127.0.0.1/shop2017_session'
    },
    cookie:{
        maxAge:120000
    },
    qiniu:{
        ak:'rukFB3HXygmUosf5-p-F-vkibN1tpy5r-dC3sMpI',
        sk:'87ORkozhImX0hadv2JE6-RNoCYn3DvDNZ4fxKNlN',
        domain:'http://ol656f0v3.bkt.clouddn.com/'
    }
}
