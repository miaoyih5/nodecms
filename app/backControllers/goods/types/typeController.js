/**
 * Created by LISHI on 2017/1/30.
 */

'use strict';


const mongoose = require('mongoose')
const Type = mongoose.model('Type')

exports.list = function(req, res) {

    Type.findAsync().then(doc => {
        res.status(400).json({ message: 'ok', data: doc })
    }).catch(err => {
        res.status(400).json({ message: 'add faild' })
    })

}

exports.add = function(req, res) {


    Type.createAsync(req.body).then(doc => {
        res.status(200).json({ message: 'add ok', id: doc._id })
    }).catch(err => {
        res.status(400).json({ message: 'add faild' })
    })

}
exports.del = function(req, res) {

    let id = req.body.id;
    Type.findByIdAndRemoveAsync(id).then(() => {
        res.status(200).json({ message: 'remove ok' })
    }).catch((err) => {
        res.status(400).json({ message: 'remove faild' })
    })

}

exports.upd = function(req, res) {

    let id = req.body.id;
    if (req.body._d) {
        delete req.body.id;
    }
    Type.findByIdAndUpdateAsync(id, req.body, { new: true }).then(doc => {
        res.status(200).json({ success: 'update ok', id: doc._id });
    }).catch(err => {
        res.status(400).json({ message: 'upd faild' })
    })


    // res.json('good_list_upd')
}
