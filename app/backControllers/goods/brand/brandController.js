/**
 * Created by LISHI on 2017/1/30.
 */

'use strict';
const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')
const winston = require('winston')

exports.list = function(req, res) {

    winston.log('info', 'Test Log Message', { anything: 'This is metadata' });
    let condition = {}

    if (req.body.name) {
        let reg = new RegExp(req.body.name, 'i')
        condition = {
            $or: [ //多条件，数组
                { name: { $regex: reg } }
            ]
        }
    }
    Brand.findAsync(condition).then(doc => {
        res.json({
            status: 200,
            msg: '数据获取成功',
            data: doc
        })
    }).catch(err => {
        res.json({ status: 400, msg: '数据获取失败', data: {} })
    })

    // Article.find(condition)
    // .select('title images visit_count comment_count like_count publish_time')
    // .skip(startRow)
    // .limit(itemsPerPage)
    // .sort(sort)
    // .exec().then(function (list) {
    //     return res.status(200).json({data:list});
    // }).then(null,function (err) {
    //     return next(err);
    // });


    // res.status(200).json({ message: 200 })
}

/*
品牌添加
 */
exports.add = (req, res) => {

    Brand.createAsync(req.body).then(doc => {
        res.json({ status: 200, msg: '创建成功', data: doc })
    }).catch((err) => {
        res.json({ status: 400, msg: '已存在该分类', data: {} })
    })

}


/*
根据Id品牌添加
 */
exports.getById = (req, res) => {
    let id = req.body.id;
    Brand.findByIdAsync(id).then((doc) => {
        res.json({
            status: 200,
            msg: '获取数据成功',
            data: doc
        })
    }).catch((err) => {
        res.json({ status: 400, msg: '获取失败', data: {} })
    })
}

// 删除
exports.del = (req, res) => {

    let id = req.params.id;

    Brand.findByIdAndRemoveAsync(id).then(() => {
        res.json({ status: 200, msg: '删除成功', data: { id: id } })
    }).catch((err) => {
        res.json({ status: 400, msg: '删除失败', data: {} })
    })








}
exports.upd = (req, res) => {
    let id = req.body._id;
    if (req.body._id) {
        delete req.body._id
    } else {
        res.json({ status: 400, msg: '更新失败,id不存在', data: {} })
    }



    if (req.body.pid === '') {
        req.body.pid = 0
    }
    console.log(req.body);

    Brand.findByIdAndUpdateAsync(id, req.body, { new: true }).then(doc => {
        console.log(doc);
        if (doc) {
            res.json({ status: 200, msg: '更新成功', data: doc })

        } else {
            res.json({ status: 400, msg: '更新失败,id不存在', data: {} })

        }
    }).catch(err => {
        console.log(err);

        res.json({ status: 400, msg: '更新失败', data: {} })
    })

}
