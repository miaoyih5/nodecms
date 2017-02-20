/**
 * Created by LISHI on 2017/1/30.
 */

'use strict';
const mongoose = require('mongoose')
const Article = mongoose.model('Article')
const qiniuFile = require('../../utils/qiniuFile')
const uuid = require('uuid')
const fs = require('fs')

const _ = require('lodash')
    // const moment = require(moment)







exports.list = function(req, res) {

    console.log(req.body);




    let condition = {}

    if (req.body.author) {
        let reg = new RegExp(req.body.author, 'i')

        // let name_p = req.body.name
        condition = {
            $or: [ //多条件，数组
                { author: { $regex: reg } }
            ]
        }
    }
    if (req.body.time) {
        console.log(req.body.time[1]);

        let startTime1 = req.body.time[0]
        let startTime2 = req.body.time[1]

        condition = _.defaults(condition, { startTime: { $gt: startTime1, $lt: startTime2 } })

    }

    if (req.body.beginPrice && req.body.endPrice) {
        condition = _.defaults(condition, { price: { $gt: req.body.beginPrice, $lt: req.body.endPrice } })

    } else if (req.body.endPrice) {
        condition = _.defaults(condition, { price: { $lt: req.body.endPrice } })
    } else if (req.body.beginPrice) {
        condition = _.defaults(condition, { price: { $gt: req.body.beginPrice } })
    }



    console.log(condition);

    let limit = req.body.limit;
    let page = req.body.page;

    Article.find(condition).populate({ path: 'tag', select: { name: 1, _id: 1 }, options: { sort: { endTime: -1 } } }).skip(limit * (page - 1)).limit(limit).exec().then(doc => {

        Article.count({}).then((sum) => {
            res.json({
                status: 200,
                msg: '数据获取成功',
                data: doc,
                total: sum
            })
        })

    }).catch(err => {
        res.json({ status: 400, msg: '数据获取失败', data: {} })
    })


    // res.status(200).json({ message: 200 })
}

exports.add = (req, res) => {
    console.log(req.body);

    Article.createAsync(req.body).then(doc => {
        res.json({
            status: 200,
            msg: '数据添加成功',
            data: doc
        })
    }).catch(err => {
        console.log(err);
        res.json({ status: 400, msg: err, data: {} })
    })
}

const getImgKey = (str) => {
    console.log(str);

    if (!str.length) {
        return ''
    }

    let arrTemp = str.split('\/')
    let len = arrTemp.length

    let res = arrTemp[len - 1]
    console.log(res);
    return res;
}


exports.del = (req, res) => {

    let id = req.params.id;

    Article.findByIdAsync(id).then(doc => {
        console.log(doc);
        let cover = doc.cover;
        qiniuFile.removeFile('shop', getImgKey(cover))

        Article.findByIdAndRemoveAsync(id).then(doc => {
            res.json({
                status: 200,
                msg: '数据删除成功',
                data: doc
            })
        }).catch(err => {
            res.json({ status: 400, msg: '数据删除失败', data: {} })
        })

    })




}
exports.upd = (req, res) => {

    let id = req.body._id;

    if (req.body._id) {
        delete req.body._id
    }
    console.log(id);

    Article.findByIdAndUpdateAsync(id, req.body, { new: true }).then(doc => {
        console.log(doc);
        res.json({
            status: 200,
            msg: '数据更新成功',
            data: doc
        })
    }).catch(err => {
        res.json({ status: 400, msg: '数据更新失败', data: {} })
    })

}
exports.uploadOne = (req, res) => {
    let file = req.file;

    getImgKey(file.path)
    qiniuFile.uploadFile('shop', file.filename, file.path).then(ret => {
        fs.unlinkSync(file.path)
        console.log(ret);
        res.status(200).json(ret)
    }).catch(err => {
        fs.unlinkSync(file.path)
        res.status(400).json(err)
    })

}
exports.uploadMultiple = (req, res) => {
    let file = req.file;
    qiniuFile.uploadFile('shop', file.filename, file.path).then(ret => {
        fs.unlinkSync(file.path)
        res.status(200).json(ret)
    }).catch(err => {
        fs.unlinkSync(file.path)
        res.status(400).json(err)
    })
}
exports.removeImage = (req, res) => {
    let key = req.body.key;
    qiniuFile.removeFile('shop', getImgKey(key)).then(doc => {
        console.log(doc);
        if (doc.error) {
            res.json({ status: 400, msg: '该图片已删除', data: {} })
        } else {
            res.json({
                status: 200,
                msg: '删除图片成功',
                data: doc
            })
        }



    }).catch(err => {
        res.json({ status: 400, msg: '删除图片失败', data: {} })
    })
}
