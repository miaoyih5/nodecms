/**
 * Created by LISHI on 2017/1/30.
 */

'use strict';
const mongoose = require('mongoose')
const CaseTag = mongoose.model('CaseTag')







exports.list = function(req, res) {

    console.log(req.body);

    let reg = new RegExp(req.body.name, 'i')

    let condition = {}


    if(req.body.name){
        // let name_p = req.body.name
        condition = {
            $or : [ //多条件，数组
            {name : {$regex : reg}}
        ]
        }
    }

    console.log(condition);


    CaseTag.find(condition).then(doc => {
        console.log(doc);
        
        
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

exports.add = (req, res) => {

    console.log(req.body.pid);

    if (req.body.pid == "") {
        req.body.pid = 0
    }

    CaseTag.createAsync(req.body).then(doc => {
        res.json({ status: 200, msg: '创建成功', data: doc })
    }).catch((err) => {
        res.json({ status: 400, msg: '已存在该分类', data: {} })
    })

}



exports.getById = (req, res) => {
    let id = req.body.id;
    CaseTag.findByIdAsync(id).then((doc) => {
        res.json({
            status: 200,
            msg: '获取数据成功',
            data: doc
        })
    }).catch((err) => {
        res.json({ status: 400, msg: '获取失败', data: {} })
    })
}

exports.del = (req, res) => {

    let id = req.body.id;


    CaseTag.findByIdAndRemoveAsync(id).then(() => {
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



    if(req.body.pid===''){
       req.body.pid = 0 
    }
    console.log(req.body);

    CaseTag.findByIdAndUpdateAsync(id, req.body, { new: true }).then(doc => {
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
