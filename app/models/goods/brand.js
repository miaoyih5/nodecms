/**
 * Created by LISHI on 2017/1/30.
 */

// 品牌模型
// 
// 
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({

    name: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        unique: true,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    cover:{
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    }
})

BrandSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})


BrandSchema
    .path('name')
    .validate(function(value, respond) {
        let self = this;
        this.constructor.findOne({ name: value }, function(err, user) {
            if (err) throw err;
            if (user) {
                if (self._id === user._id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, '已存在该品牌');


BrandSchema.set('toObject', { virtuals: true });
BrandSchema.set('toJSON', { getters: true, virtuals: false });

mongoose.model('Brand', BrandSchema)
