

'use strict';

const qiniu = require("qiniu");
const config = require('../config/config');
const Promise = require('bluebird');



const putFile = Promise.promisify(qiniu.io.putFile);
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = config.qiniu.ak;
qiniu.conf.SECRET_KEY = config.qiniu.sk;


const client = new qiniu.rs.Client();
const remove = Promise.promisify(client.remove, client);





//构建上传策略函数
function uptoken(bucket, key) {
    let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
}









//构建bucketmanager对象

//你要测试的空间， 并且这个key在你空间中存在


//删除资源
//
//




/**
 * 删除单个文件
 * @param  {[String]} bucketName [空间名]
 * @param  {[String]} key        [文件名]
 * @return {[type]}            [返回promise]
 */
exports.removeFile = (bucketName,key)=>{
    return remove(bucketName, key).then((ret)=>{
        return {message:"remove_ok"}
    }).catch((err)=>{
        console.log(err);
        return err
    })

}









/**上传函数
 * @param  {[Sting]} bucketName 上传到的空间
 * @param  {[String]} key        [文件名]
 * @param  {[type]} filePath  [文件路径]
 * @return {[cb]}            回调结果
 */





exports.uploadFile = function(bucketName, key, filePath) {

    let token = uptoken(bucketName, key);
    let extra = new qiniu.io.PutExtra();

   return putFile(token, key, filePath, extra).then((ret) => {
        let res = config.qiniu.domain + ret.key;
        return res;
    }).catch((err) => {
        return err;
    })
}



