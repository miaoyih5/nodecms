/**
 * Created by LISHI on 2017/1/30.
 */


/**
 * Created by LISHI on 2017/1/30.
 */


const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const OrderSchema = new Schema({
    detail: [{
        good: {
            type: ObjectId,
            ref: 'Goods'
        },
        number: {
            type: Number,
            default: ''
        }
    }],
    creatAt: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    customer: {
        type: ObjectId,
        ref: 'User'
    },
    Address: {
        type: 'String',
        default: ''
    },
    remark: {
        type: String,
        default: ''
    }
})


OrderSchema.static = {

    getOrderById: function(id, cb) {
        this.findById(id).exec((err, doc) => {
            if (err) {
                return cb(err)
            }

            cb(doc)
        })
    },

    
    getOrders: function(limit, page, cb) {
        this.find({}).populate('detail.goods detail.number').limit(limit).skip(limit * (page - 1)).exec((err, doc) => {
            if (err) {
                return cb(err)
            }

            cb(doc)
        })
    }

}


OrderSchema.set('toObject', { virtuals: true });


mongoose.model('Order', OrderSchema)
