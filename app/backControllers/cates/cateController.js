/**
 * Created by LISHI on 2017/1/30.
 */

'use strict';
const mongoose = require('mongoose')
const Cate = mongoose.model('Cate')

exports.list = function(req, res) {

    Cate.findAsync().then(doc=>{
         res.json(doc)
     }).catch(err=>{
        res.json(err)
     })

    // Cate.find({}, (err, doc) => {
    //     if (err) return res.json(err)
    //     res.json(doc)
    // })
}

exports.add = (req, res) => {

    let cate = new Cate(req.body)

    cate.saveAsync().then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
}
exports.del = (req, res) => {
    let id = req.body.id;
    Cate.removeAsync({ _id: id }, (err, doc) => {
        console.log(doc);
        if (err) return res.status(400).json('err')
        res.status(200).json({
            message: 'remove success'
        })
    })
}
exports.upd = (req, res) => {
    let _cate = req.body
    let id = _cate.id

    Cate.findByIdAndUpdateAsync(id,{$set:{name:_cate.name,desc:_cate.desc,pid:_cate.pid}}).then(doc=>{
        res.status(200).json({ message: 'update success', cates: doc })
    }).catch(err=>{
        res.status(400).json(err)
    })
}
