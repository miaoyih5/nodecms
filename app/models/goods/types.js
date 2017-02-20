/**
 * Created by LISHI on 2017/1/30.
 */

/**
 * 分类模型
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypeSchema = new Schema({

    name: {
        type: String,
        unique: true,
        default: ''
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

TypeSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})


TypeSchema
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
    }, '已存在该分类');


TypeSchema.set('toObject', { virtuals: true });

mongoose.model('Type', TypeSchema)
