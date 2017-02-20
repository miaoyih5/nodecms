/**
 * Created by LISHI on 2017/1/30.
 */


/**
 * 商品模型
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


var GoodsSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    cateId: {
        type: ObjectId,
        ref: 'Cate'
    },
    brandId: {
        type: ObjectId,
        ref: 'Brand'
    },
    type_id: {
        type: ObjectId,
        ref: 'Type'
    },
    keyword: [{
        type: String,
        default: ''
    }],
    jifen: {
        type: Number,
        default: 0
    },
    imgs: [{
        type: String,
        default: ''
    }],
    price: {
        type: String,
        default: ''
    },
    priceHot: {
        type: String,
        default: ''
    },
    attr: {
        type: String,
        default: ''
    },
    isHot: {
        type: Number,
        default: 0
    },
    isPromote: {
        type: Number,
        default: 0
    },
    is_new: {
        type: Number,
        default: 0
    },
    is_best: {
        type: Number,
        default: 0,
    },
    is_onSale: {
        type: Number,
        default: 0
    },
    is_delete: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    store: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        },
        productTime: {
            type: Date,
            default: Date.now
        }
    }

})

GoodsSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})





GoodsSchema.set('toObject', { virtuals: true });

mongoose.model('Goods', GoodsSchema);
